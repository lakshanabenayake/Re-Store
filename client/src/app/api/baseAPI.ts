import { BaseQueryApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { startLoading, stopLoading } from "../layout/uiSlice";

const customBaseQuery = fetchBaseQuery({
    baseUrl: 'https://localhost:5001/api',
    // prepareHeaders: (headers) => {
    //     // Add any custom headers here, e.g., authentication tokens
    //     headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    //     return headers;
    // }
});

const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));

export const baseQueryWithErrorHandling = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    api.dispatch(startLoading());
    await sleep(); // for demo purposes
    const result = await customBaseQuery(args, api, extraOptions);
    api.dispatch(stopLoading());

   if(result.error) {
    const {status, data} = result.error;
    console.log({data, status});
   }
   return result;
};
export default baseQueryWithErrorHandling;