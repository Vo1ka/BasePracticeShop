import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { Product } from '../../types/type';

interface CartItem extends Product {
    quantity: number; // Добавляем quantity к продукту в корзине
  }
  
  interface CartState {
    items: CartItem[];
    total: number;
  }
  
  const initialState: CartState = {
    items: [],
    total: 0,
  };

  const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      addToCart: (state, action: PayloadAction<CartItem>) => {
        const existingItem = state.items.find((item) => item.id === action.payload.id);
        if (existingItem) {
          existingItem.quantity += action.payload.quantity; // Учитываем переданное quantity
        } else {
          state.items.push(action.payload);
        }
        state.total = calculateTotal(state.items);
      },
  
      removeFromCart: (state, action: PayloadAction<number>) => {
        const removedItem = state.items.find((item) => item.id === action.payload);
        if (removedItem) {
          state.items = state.items.filter((item) => item.id !== action.payload);
          state.total = calculateTotal(state.items);
        }
      },
  
      updateQuantity: (
        state,
        action: PayloadAction<{ id: number; quantity: number }>
      ) => {
        const item = state.items.find((item) => item.id === action.payload.id);
        if (item) {
          item.quantity = action.payload.quantity;
          state.total = calculateTotal(state.items);
        }
      },
    },
  });
  
  // Вспомогательная функция для пересчёта total
  const calculateTotal = (items: CartItem[]) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };
  
  export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
  export default cartSlice.reducer;