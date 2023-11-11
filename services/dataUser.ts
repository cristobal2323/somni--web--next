import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./config";

//types
import { IDataUser, IState, IMessage } from "../interfaces";

type Data = {
  message: IMessage;
  state: IState;
  data: IDataUser;
};

type ParametersGetDataUser = {
  user_id: string;
};

type ParametersUpdateOperario = {
  username: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  uid: string;
  email: string;
  lenguaje: string;
  user_id: number;
};

export const userDataApi = createApi({
  reducerPath: "userDataApi",
  baseQuery: baseQuery,
  tagTypes: ["dataUser"],
  endpoints: (builder) => ({
    getDataUser: builder.query<Data, ParametersGetDataUser>({
      query: ({ user_id }) => ({
        url: `dataUser`,
        params: {
          user_id: user_id,
        },
      }),
      providesTags: () => ["dataUser"],
    }),

    putOperario: builder.mutation<Data, ParametersUpdateOperario>({
      query: (body) => ({
        url: `dataUser`,
        body,
        method: "PUT",
      }),
      invalidatesTags: ["dataUser"],
    }),
  }),
});

export const { useGetDataUserQuery, usePutOperarioMutation } = userDataApi;
