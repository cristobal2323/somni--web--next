import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api/",
  prepareHeaders: (headers, { getState }) => {
    headers.set("Access-Control-Allow-Origin", "*");
    return headers;
  },
});

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: baseQuery,
  tagTypes: [],
  endpoints: (builder) => ({
    Login: builder.mutation({
      query: (body) => ({
        url: "auth",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const { useLoginMutation } = loginApi;
