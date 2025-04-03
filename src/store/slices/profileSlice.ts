import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'processing' | 'shipped' | 'delivered';
  items: Array<{
    productId: number;
    quantity: number;
    price: number;
  }>;
}

interface ProfileState {
    orders: Order[];
}

const initialState: ProfileState = {
    orders: JSON.parse(localStorage.getItem('userOrders') || '[]'),
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<Order>) =>{
            state.orders.unshift(action.payload);
            localStorage.setItem('userOrders', JSON.stringify(state.orders))
        }
    }
})

export const { addOrder } = profileSlice.actions;
export default profileSlice.reducer;