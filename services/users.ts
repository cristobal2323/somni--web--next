import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./config";

//types
import { IUsers, IState, IMessage } from "../interfaces";

type Data = {
  message: IMessage;
  state: IState;
  data: IUsers;
};

type ParametersGetUsers = {
  empresa_id: string;
  filtro: string;
  reg_inicio: number;
  reg_fin: number;
};

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: baseQuery,
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query<Data, ParametersGetUsers>({
      query: ({ empresa_id, filtro, reg_inicio, reg_fin }) => ({
        url: `users`,
        params: {
          empresa_id: empresa_id,
          filtro: filtro,
          reg_inicio: reg_inicio,
          reg_fin: reg_fin,
        },
      }),
      providesTags: () => ["Users"],
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetUsersQuery } = usersApi;
