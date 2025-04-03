import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Product } from '../../types/type';
// Тип для продукта согласно DummyJSON API
// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   thumbnail: string;
//   description: string;
//   rating: number;
//   stock?: number;
//   brand: string;
//   category: string;
// }

interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  status: 'idle',
  error: null
};

export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      // Явно указываем тип ответа
      const response = await axios.get<{
        products: Product[];
        total: number;
        skip: number;
        limit: number;
      }>('https://dummyjson.com/products?limit=100');
      
      return response.data.products;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Unknown error occurred');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    filterProducts: (state, action: PayloadAction<string>) => {
      if (!action.payload.trim()) {
        state.filteredItems = state.items;
      } else {
        state.filteredItems = state.items.filter(product =>
          product.title.toLowerCase().includes(action.payload.toLowerCase())
        );
      }
    },
    initializeProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      state.filteredItems = action.payload;
    },
    syncAdminChanges: (state, action: PayloadAction<Product[]>) => {
      const adminProductsMap = new Map(action.payload.map(p => [p.id, p]));
      
      state.items = state.items.map(product => {
        return adminProductsMap.get(product.id) || product;
      });
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

export const { filterProducts, syncAdminChanges, initializeProducts } = productsSlice.actions;
export default productsSlice.reducer;