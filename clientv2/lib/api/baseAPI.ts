import { BaseQueryApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { startLoading, stopLoading } from "../store/slices/uiSlice";
import { toast } from "sonner";

const customBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://localhost:5001/api',
  credentials: 'include'
});

type ErrorResponse = string | { title: string } | { errors: string[] };

const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));

export const baseQueryWithErrorHandling = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  api.dispatch(startLoading());
  const result = await customBaseQuery(args, api, extraOptions);
  console.log(result);
  api.dispatch(stopLoading());

  if (result.error) {
    console.log(result.error);

    const originalStatus =
      result.error.status === 'PARSING_ERROR' && result.error.originalStatus
        ? result.error.originalStatus
        : result.error.status;

    const responseData = result.error.data as ErrorResponse;
    
    // Get the URL from args to check which endpoint is being called
    const url = typeof args === 'string' ? args : args.url;
    
    // Don't show toast for 401 on user-info endpoint (it's expected when not logged in)
    const isUserInfoEndpoint = url.includes('account/user-info');

    switch (originalStatus) {
      case 400:
        if (typeof responseData === 'string') toast.error(responseData);
        else if ('errors' in responseData) {
          toast.error(Object.values(responseData.errors).flat().join(', '));
        } else toast.error(responseData.title);
        break;
      case 401:
        // Don't show unauthorized toast for user-info endpoint
        if (!isUserInfoEndpoint && typeof responseData === 'object' && 'title' in responseData) {
          toast.error(responseData.title);
        }
        break;
      case 404:
        if (typeof responseData === 'object' && 'title' in responseData) {
          toast.error('Resource not found');
          // In Next.js, you can use router.push('/not-found') from the component
        }
        break;
      case 500:
        toast.error('Server error occurred');
        // In Next.js, you can use router.push('/server-error') from the component
        break;
      default:
        break;
    }
  }

  return result;
};
