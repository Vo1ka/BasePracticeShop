// src/store/slices/productsSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from './../../types/type';

interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Моковые товары
const mockProducts: Product[] = [
  { id: 1, title: 'Телефон', price: 500, image: 'url'},
  { id: 2, title: 'Ноутбук', price: 1200, image: 'url' },
];

// Асинхронная загрузка товаров
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    return new Promise<Product[]>((resolve) => {
      setTimeout(() => resolve(mockProducts), 1000);
    });
  }
);

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  status: 'idle',
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    filterProducts: (state, action: PayloadAction<string>) => {
      if (!action.payload) {
        state.filteredItems = state.items;
      } else {
        state.filteredItems = state.items.filter((product) =>
          product.title.toLowerCase().includes(action.payload.toLowerCase())
        );
      }
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Ошибка загрузки';
      });
  },
});

export const { filterProducts, setProducts } = productsSlice.actions;
export default productsSlice.reducer;