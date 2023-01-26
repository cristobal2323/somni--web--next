import React, { useMemo, useState } from "react";

//Next
import { NextPage } from "next";

//Material
import { Grid, Typography, Box } from "@mui/material";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Text,
  Tooltip,
} from "recharts";

//types

import { IResumenPersonas } from "../../interfaces/";
import { LoaderComponent } from "../ui";
import { all } from "axios";

interface Props {
  data: IResumenPersonas;
  isFetching: boolean;
}

interface IResumenObjPersonas {
  q_con_riesgo: number;
  q_sin_riesgo: number;
  nombre_completo: string;
}

export const PersonasComponent: NextPage<Props> = ({ data, isFetching }) => {
  if (!data.ejecucion.estado) {
    <Typography fontWeight={900}>Ejecución false</Typography>;
  }

  const [all, setAll] = useState<boolean>(false);

  let arr: IResumenObjPersonas[] = [];

  arr = useMemo(() => {
    const memory: IResumenObjPersonas[] = data.datos.datos.map((item) => {
      let nombreCompletoCorregido = item.nombre_completo.replace(
        /^\s+|\s+$|\s+(?=\s)/g,
        ""
      );

      let nombre = nombreCompletoCorregido.split(" ");
      let primeraLetra = nombre[0][0] + ".";
      let apellido = nombreCompletoCorregido.split(" ");
      let apellidoCompleto = apellido[1];

      let nombreCompleto = primeraLetra + apellidoCompleto;

      return {
        nombre_completo: nombreCompleto,
        q_con_riesgo: item.q_con_riesgo,
        q_sin_riesgo: item.q_sin_riesgo,
      };
    });

    return memory;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const filterData = (
    dataFilter: IResumenObjPersonas[]
  ): IResumenObjPersonas[] => {
    return dataFilter.filter((o) => o.q_con_riesgo > 0);
  };

  return (
    <Grid item={true} xs={12} sm={12} md={12} lg={6} marginTop={2}>
      <Box
        position={"relative"}
        marginX={2}
        bgcolor={"info.main"}
        padding={"20px 10px"}
        borderRadius={3}
        border={"solid 1px #ccc"}
        height={filterData(arr).length * 40 + 100}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            {isFetching && <LoaderComponent borderRadius={5} />}
            <Box display={"flex"} justifyContent={"center"} marginBottom={1}>
              <Typography variant="h6" fontWeight={500} fontSize={16}>
                Resultado de controles
              </Typography>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"center"}
              flexWrap={"wrap"}
              marginBottom={2}
            >
              <Typography
                variant="body1"
                fontWeight={300}
                fontSize={14}
                marginX={2}
                display={"flex"}
                alignItems={"center"}
              >
                <Box
                  component="span"
                  width={14}
                  height={14}
                  bgcolor={"#118dff"}
                  marginRight={1}
                />
                Con riesgo
              </Typography>
              <Typography
                variant="body1"
                fontWeight={300}
                fontSize={14}
                marginX={2}
                display={"flex"}
                alignItems={"center"}
              >
                <Box
                  component="span"
                  width={14}
                  height={14}
                  bgcolor={"#4673f0"}
                  marginRight={1}
                />
                Sin riesgo
              </Typography>
            </Box>
            <ResponsiveContainer
              width={"99.9%"}
              height={filterData(arr).length * 40}
            >
              <BarChart
                data={filterData(arr)}
                layout="vertical"
                margin={{ left: 40, right: 35, bottom: 25 }}
              >
                <Tooltip />
                <XAxis
                  axisLine={true}
                  tick={{ fontSize: 12 }}
                  type="number"
                  label={{
                    value: data.datos.label_cantidad_de_controles,
                    position: "insideBottom",
                    dy: 15,
                    fontWeight: 400,
                  }}
                />
                <YAxis
                  interval={0}
                  tick={{ fontSize: 12 }}
                  dataKey="nombre_completo"
                  type="category"
                  label={{
                    fontSize: "12px",
                    fontWeight: 400,
                  }}
                />

                <Bar dataKey="q_con_riesgo" fill="#118dff" stackId="a" />
                <Bar dataKey="q_sin_riesgo" fill="#4673f0" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Box>
    </Grid>
  );
};
