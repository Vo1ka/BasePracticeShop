import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../../types/type';

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

// Создаем API с RTK Query
export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, { limit?: number; skip?: number }>({
      query: ({ limit = 100, skip = 0 }) => `products?limit=${limit}&skip=${skip}`,
      providesTags: ['Products'],
      transformResponse: (response: ProductsResponse) => ({
        ...response,
        products: response.products.map(product => ({
          ...product,
          isModified: false,
          isLocal: false,
          isDeleted: false,
        })),
      }),
    }),
    //Функционал ниже описан как код для реальных запросов к API

    // getProductById: builder.query<Product, number>({
    //   query: (id) => `products/${id}`,
    //   providesTags: (result, error, id) => [{ type: 'Products', id }],
    // }),
//     addProduct: builder.mutation<Product, Omit<Product, 'id' | 'isModified' | 'isLocal' | 'isDeleted'>>({
//       query: (newProduct) => ({
//         url: 'products/add',
//         method: 'POST',
//         body: newProduct,
//       }),
//       invalidatesTags: ['Products'],
//     }),
//     updateProduct: builder.mutation<Product, Partial<Product> & { id: number }>({
//       query: ({ id, ...patch }) => ({
//         url: `products/${id}`,
//         method: 'PATCH',
//         body: patch,
//       }),
//       invalidatesTags: (result, error, { id }) => [{ type: 'Products', id }],
//     }),
//     deleteProduct: builder.mutation<void, number>({
//       query: (id) => ({
//         url: `products/${id}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: (result, error, id) => [{ type: 'Products', id }],
//     }),
   }),
});

export const { useGetProductsQuery } = productsApi;