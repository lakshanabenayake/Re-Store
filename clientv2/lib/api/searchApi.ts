// lib/api/searchApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithErrorHandling } from './baseAPI';

export interface SearchResult {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    pictureUrl: string;
    type: string;
    brand: string;
    quantityInStock: number;
  };
  score: number;
}

export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ['Search'],
  endpoints: (builder) => ({
    semanticSearch: builder.query<SearchResult[], { query: string; topK?: number }>({
      query: ({ query, topK = 10 }) => ({
        url: `/products/search?query=${encodeURIComponent(query)}&topK=${topK}`,
      }),
      providesTags: ['Search'],
    }),
    indexAllProducts: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: '/products/index',
        method: 'POST',
      }),
    }),
    indexProduct: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/products/index/${id}`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useSemanticSearchQuery,
  useLazySemanticSearchQuery,
  useIndexAllProductsMutation,
  useIndexProductMutation,
} = searchApi;
