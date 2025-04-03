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
  const saveCartToLocalStorage = (state: CartState) => {
    try {
      localStorage.setItem('cart', JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  };
  // Функция для безопасного получения cart из localStorage
  const getInitialCartState = (): CartState => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        return JSON.parse(savedCart);
      }
    } catch (e) {
      console.error('Failed to parse cart from localStorage', e);
    }
    return { items: [], total: 0 };
  };
  const initialState: CartState = getInitialCartState();

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
        saveCartToLocalStorage(state)
      },
  
      removeFromCart: (state, action: PayloadAction<number>) => {
        const removedItem = state.items.find((item) => item.id === action.payload);
        if (removedItem) {
          state.items = state.items.filter((item) => item.id !== action.payload);
          state.total = calculateTotal(state.items);
          saveCartToLocalStorage(state)
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