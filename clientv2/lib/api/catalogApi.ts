import { createApi } from "@reduxjs/toolkit/query/react";
import { Product } from "../models/product";
import { baseQueryWithErrorHandling } from "./baseAPI";

interface ProductsResponse {
  items: Product[];
  metadata: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
  };
}

interface ProductParams {
  orderBy?: string;
  searchTerm?: string;
  types?: string[];
  brands?: string[];
  pageNumber?: number;
  pageSize?: number;
}

interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  type: string;
  brand: string;
  quantityInStock: number;
}

interface UpdateProductDto extends CreateProductDto {
  id: number;
}

export const catalogApi = createApi({
  reducerPath: 'catalogApi',
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    fetchProducts: builder.query<ProductsResponse, Partial<ProductParams>>({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        if (params.orderBy) searchParams.append('orderBy', params.orderBy);
        if (params.searchTerm) searchParams.append('searchTerm', params.searchTerm);
        if (params.types?.length) params.types.forEach(t => searchParams.append('types', t));
        if (params.brands?.length) params.brands.forEach(b => searchParams.append('brands', b));
        if (params.pageNumber) searchParams.append('pageNumber', params.pageNumber.toString());
        if (params.pageSize) searchParams.append('pageSize', params.pageSize.toString());
        
        return { url: `products?${searchParams.toString()}` };
      },
      transformResponse: (response: Product[], meta) => {
        // Extract pagination metadata from response headers
        const paginationHeader = meta?.response?.headers.get('Pagination');
        let metadata = {
          currentPage: 1,
          totalPages: 1,
          pageSize: 10,
          totalCount: Array.isArray(response) ? response.length : 0
        };

        if (paginationHeader) {
          try {
            metadata = JSON.parse(paginationHeader);
          } catch (e) {
            console.error('Failed to parse pagination header:', e);
          }
        }

        return {
          items: Array.isArray(response) ? response : [],
          metadata
        };
      },
      providesTags: ['Product'],
    }),
    fetchProductDetails: builder.query<Product, number>({
      query: (productId) => ({ url: `products/${productId}` }),
      providesTags: (_result, _error, id) => [{ type: 'Product', id }],
    }),
    createProduct: builder.mutation<Product, FormData>({
      query: (formData) => ({
        url: 'products',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: 'products',
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const { 
  useFetchProductsQuery, 
  useFetchProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = catalogApi;
