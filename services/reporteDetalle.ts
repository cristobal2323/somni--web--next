import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./config";

//types
import { IReporteDetalle, IState, IMessage } from "../interfaces";

type Data = {
  message: IMessage;
  state: IState;
  data: IReporteDetalle;
};

type ParametersGetReporteDetalle = { desde: string; hasta: string };

export const reporteDetalleApi = createApi({
  reducerPath: "reporteDetalleApi",
  baseQuery: baseQuery,
  tagTypes: ["ReporteDetalle"],
  endpoints: (builder) => ({
    getReporteDetalle: builder.query<Data, ParametersGetReporteDetalle>({
      query: ({ desde, hasta }) => ({
        url: `reporteDetalle`,
        params: { desde: desde, hasta: hasta },
      }),
      providesTags: () => ["ReporteDetalle"],
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetReporteDetalleQuery } = reporteDetalleApi;
