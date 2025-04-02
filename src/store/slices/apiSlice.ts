import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../../types/type";

export const api = createApi({
    baseQuery: fetchBaseQuery({
         baseUrl: 'https://dummyjson.com',
        prepareHeaders: (headers)=>{
            headers.set('Accept', 'application/json');
            return headers;
        } }),
    tagTypes: ['Product'], //инвалидация кеша
        endpoints: (build) => ({
            getProducts: build.query<Product[], void>({
                query: () => '/products?limit=100',
                transformResponse: (Response: {products: Product[]}) => Response.products,
                providesTags: ['Product'] //Кешируем  с тегом
            }),
            getProduct: build.query<Product, number>({
                query: (id) => `/products/${id}`,
                providesTags: (_, __, id) => [{type: 'Product', id}]
            }),
            getPaginatedProducts: build.query<{ products: Product[], total: number }, { page: number, limit: number }>({
                query: ({page, limit}) => `/products?limit=${limit}&skip=${(page-1)*limit}`,
                transformResponse: (response: { products: Product[], total: number }) => ({
                    products: response.products,
                    total: response.total
                }),
            }),
            addProduct: build.mutation<Product, Partial<Product>>({
                query: (body) => ({
                    url: '/products/add',
                    method: 'POST',
                    body
                }),
                invalidatesTags: ['Product'] //
            })


        }),
            
  })
export const {
    useGetProductsQuery,
    useGetProductQuery,
    useAddProductMutation,
    useGetPaginatedProductsQuery
} = api;