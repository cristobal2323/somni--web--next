import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./config";

//types
import { IReportePersonas, IState, IMessage } from "../interfaces";

type Data = {
  message: IMessage;
  state: IState;
  data: IReportePersonas;
};

type ParametersGetReportePersonas = { desde: string; hasta: string };

export const reportePersonasApi = createApi({
  reducerPath: "reportePersonasApi",
  baseQuery: baseQuery,
  tagTypes: ["ReportePersonas"],
  endpoints: (builder) => ({
    getReportePersonas: builder.query<Data, ParametersGetReportePersonas>({
      query: ({ desde, hasta }) => ({
        url: `reportePersonas`,
        params: { desde: desde, hasta: hasta },
      }),
      providesTags: () => ["ReportePersonas"],
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetReportePersonasQuery } = reportePersonasApi;
