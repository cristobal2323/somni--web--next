import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./config";

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: baseQuery,
  tagTypes: [],
  endpoints: (builder) => ({
    Login: builder.mutation({
      query: (body: object) => ({
        url: "auth",
        method: "POST",
        body: body,
      }),
    }),
    logOut: builder.mutation({
      query: () => ({
        url: `auth`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const { useLoginMutation, useLogOutMutation } = loginApi;
