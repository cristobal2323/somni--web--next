import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./config";

//types
import { IUsers, IRoles, IState, IMessage } from "../interfaces";

type Data = {
  message: IMessage;
  state: IState;
  data: IUsers;
};

type DataRoles = {
  message: IMessage;
  state: IState;
  data: IRoles;
};

type ParametersGetUsers = {
  empresa_id: string;
  filtro: string;
  reg_inicio: number;
  reg_fin: number;
};

type ParametersPostAsignacion = {
  turno_id: number;
  user_id: number;
};

type ParametersPostRoles = {
  turnos: number[];
  user_id: number;
};

type ParametersRoles = {};

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
    getRoles: builder.query<DataRoles, ParametersRoles>({
      query: () => ({
        url: `roles`,
      }),
    }),
    postAsignacion: builder.mutation<Data, ParametersPostAsignacion>({
      query: (body) => ({
        url: `asignarTurno`,
        body: body,
        method: "POST",
      }),
      invalidatesTags: ["Users"],
    }),
    postRoles: builder.mutation<Data, ParametersPostRoles>({
      query: (body) => ({
        url: `roles`,
        body: body,
        method: "POST",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetUsersQuery,
  usePostAsignacionMutation,
  useGetRolesQuery,
  usePostRolesMutation,
} = usersApi;
