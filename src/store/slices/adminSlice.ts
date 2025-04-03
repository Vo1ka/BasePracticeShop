// Новый adminSlice.ts (упрощенная версия)
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/type';
import { RootState } from '../store';

export interface AdminState {
  modifiedProducts: Record<number, Partial<Product>>; // Только изменения
  newProducts: Product[]; // Только новые товары
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}
export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
export const loadProducts = createAsyncThunk(
  'admin/loadProducts',
  async (_, { getState }) => {
    const state = getState() as RootState;
    // Попробуйте загрузить из localStorage или API
    const localData = JSON.parse(localStorage.getItem('adminProducts') || '[]');
    return localData.length ? localData : state.products.items; // Или API-запрос
  }
);

const initialState: AdminState = {
  modifiedProducts: JSON.parse(localStorage.getItem('adminModified') || '{}'),
  newProducts: JSON.parse(localStorage.getItem('adminNew') || '[]'),
  status: 'idle',
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    loadProducts: (state, action: PayloadAction<Product[]>) => {
      action.payload.forEach(product => {
        if (!state.modifiedProducts[product.id]) {
          state.modifiedProducts[product.id] = product;
        }
      });
      state.status = 'succeeded';
    },
    // Добавляем только новые товары (не изменяя основные)
    addProduct: (state, action: PayloadAction<Omit<Product, 'id'>>) => {
      const newProduct = {
        ...action.payload,
        id: Date.now(), // Временный ID
        isLocal: true
      };
      state.newProducts.push(newProduct);
      localStorage.setItem('adminNew', JSON.stringify(state.newProducts));
    },

    // Запоминаем только изменения (не заменяем весь товар)
    updateProduct: (state, action: PayloadAction<{id: number} & Partial<Product>>) => {
      const { id, ...changes } = action.payload;
      state.modifiedProducts[id] = {
        ...state.modifiedProducts[id],
        ...changes,
        isModified: true
      };
      localStorage.setItem('adminModified', JSON.stringify(state.modifiedProducts));
    },

    // Для удаления используем флаг (не удаляем физически)
    markAsDeleted: (state, action: PayloadAction<number>) => {
      state.modifiedProducts[action.payload] = {
        ...state.modifiedProducts[action.payload],
        isDeleted: true
      };
      localStorage.setItem('adminModified', JSON.stringify(state.modifiedProducts));
    },

    // Сброс изменений
    resetChanges: (state) => {
      state.modifiedProducts = {};
      state.newProducts = [];
      localStorage.removeItem('adminModified');
      localStorage.removeItem('adminNew');
    }
  },
  extraReducers: (build) =>{
    build
    .addCase(loadProducts.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(loadProducts.fulfilled, (state, action) => {
      state.modifiedProducts = action.payload;
      state.status = 'succeeded';
    })
    .addCase(loadProducts.rejected, (state) => {
      state.status = 'failed';
    });
  }
});

export const { addProduct, updateProduct, markAsDeleted, resetChanges } = adminSlice.actions;
export default adminSlice.reducer;