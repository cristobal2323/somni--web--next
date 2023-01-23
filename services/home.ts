import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./config";

//types
import {
  IResumenTotales,
  IResumenPersonas,
  IResumenTiempo,
  IResumenPorcentajePersonas,
  IState,
  IMessage,
} from "../interfaces";

type Data = {
  message: IMessage;
  state: IState;
  data: {
    resumenTotales: IResumenTotales;
    resumenPersonas: IResumenPersonas;
    resumenTiempo: IResumenTiempo;
    resumenPorcentajePersonas: IResumenPorcentajePersonas;
  };
};

type ParametersGetHome = { desde: string; hasta: string };

export const homeApi = createApi({
  reducerPath: "homeApi",
  baseQuery: baseQuery,
  tagTypes: ["Home"],
  endpoints: (builder) => ({
    getHome: builder.query<Data, ParametersGetHome>({
      query: ({ desde, hasta }) => ({
        url: `home`,
        params: { desde: desde, hasta: hasta },
      }),
      providesTags: () => ["Home"],
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetHomeQuery } = homeApi;
