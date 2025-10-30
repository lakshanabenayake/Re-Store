import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithErrorHandling } from './baseAPI';
import type { User, LoginRequest, RegisterRequest } from '@/lib/models/user';

export const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    // Login
    login: builder.mutation<void, LoginRequest>({
      query: (credentials) => ({
        url: 'account/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),

    // Register
    register: builder.mutation<void, RegisterRequest>({
      query: (data) => ({
        url: 'account/register',
        method: 'POST',
        body: data,
      }),
    }),

    // Get current user info
    fetchCurrentUser: builder.query<User | null, void>({
      query: () => 'account/user-info',
      providesTags: ['User'],
      transformResponse: (response: any) => {
        console.log('User API Response:', response);
        if (!response || response.status === 401) {
          return null;
        }
        const user = {
          email: response.email || response.Email,
          userName: response.userName || response.UserName,
          roles: response.roles || response.Roles || [],
        };
        console.log('Transformed User:', user);
        return user;
      },
      transformErrorResponse: (response) => {
        console.log('User API Error Response:', response);
        // Return null for 401 errors (not authenticated)
        if (response.status === 401) {
          return null;
        }
        return response;
      },
    }),

    // Logout
    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'account/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
      // Immediately clear user data from cache
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        // Optimistically clear the user data immediately
        const patchResult = dispatch(
          accountApi.util.updateQueryData('fetchCurrentUser', undefined, () => null)
        );
        
        try {
          await queryFulfilled;
          // If successful, the cache is already cleared
        } catch {
          // If the mutation fails, undo the optimistic update
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useFetchCurrentUserQuery,
  useLogoutMutation,
} = accountApi;
