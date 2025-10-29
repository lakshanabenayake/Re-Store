import { createApi } from "@reduxjs/toolkit/query/react";
import { Product } from "../models/product";
import { baseQueryWithErrorHandling } from "./baseAPI";

export const catalogApi = createApi({
  reducerPath: 'catalogApi',
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    fetchProducts: builder.query<Product[], void>({
      query: () => ({ url: 'products' }),
    }),
    fetchProductDetails: builder.query<Product, number>({
      query: (productId) => ({ url: `/products/${productId}` }),
    }),
  }),
});

export const { useFetchProductsQuery, useFetchProductDetailsQuery } = catalogApi;
