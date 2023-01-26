import React, { useMemo, useState } from "react";

//Next
import { NextPage } from "next";

//Material
import { Grid, Typography, Box, Button } from "@mui/material";

import {
  ResponsiveContainer,
  XAxis,
  LineChart,
  Line,
  ReferenceLine,
  YAxis,
  TooltipProps,
  Tooltip,
} from "recharts";

//types

import { IResumenPorcentajePersonas } from "../../interfaces/";
import { LoaderComponent } from "../ui";

interface Props {
  data: IResumenPorcentajePersonas;
  isFetching: boolean;
}

interface IResumenObjPersonas {
  nombre_completo: string;
  porcentaje_promedio_con_riesgo_limite: number;
  promedio_de_porcentaje_de_riesgo: number;
}

export const PorcentajeComponent: NextPage<Props> = ({ data, isFetching }) => {
  if (!data.ejecucion.estado) {
    <Typography fontWeight={900}>Ejecución false</Typography>;
  }

  const { curva_promedios, curva_limites } = data.datos;

  const [all, setAll] = useState<boolean>(false);

  let arr: IResumenObjPersonas[] = [];

  arr = useMemo(() => {
    const memory: IResumenObjPersonas[] = curva_promedios.datos.map((item) => {
      let nombreCompletoCorregido = item.nombre_completo.replace(
        /^\s+|\s+$|\s+(?=\s)/g,
        ""
      );

      let nombre = nombreCompletoCorregido.split(" ");
      let primeraLetra = nombre[0][0] + ".";
      let apellido = nombreCompletoCorregido.split(" ");
      let apellidoCompleto = apellido[1];

      let nombreCompleto = primeraLetra + apellidoCompleto;

      const cp: number = item.promedio_de_porcentaje_de_riesgo
        ? parseFloat(item.promedio_de_porcentaje_de_riesgo) || 0
        : 0;

      return {
        nombre_completo: nombreCompleto,
        promedio_de_porcentaje_de_riesgo: cp,
        porcentaje_promedio_con_riesgo_limite:
          curva_limites.datos[0]?.porcentaje_promedio_con_riesgo_limite || 0,
      };
    });

    return memory;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <Box
          bgcolor={"rgba(255,255,255,0.85)"}
          paddingX={1}
          paddingY={1}
          border={"solid 1px #ccc"}
        >
          <Typography
            fontSize={14}
            fontWeight={900}
          >{`Nombre: ${label}`}</Typography>
          <Typography
            fontSize={14}
            fontWeight={400}
            display={"flex"}
            alignItems={"center"}
          >
            <Box
              component="span"
              width={14}
              height={14}
              bgcolor={"#e76262"}
              marginRight={1}
            />{" "}
            Porcentaje de riesgo:{" "}
            {payload[0]?.payload?.promedio_de_porcentaje_de_riesgo}
          </Typography>
        </Box>
      );
    }

    return null;
  };

  const filterData = (
    dataFilter: IResumenObjPersonas[]
  ): IResumenObjPersonas[] => {
    if (all) {
      return dataFilter;
    }
    return dataFilter.filter((o) => o.promedio_de_porcentaje_de_riesgo > 0);
  };

  const getInterval = (value: number): number => {
    if (value > 15) {
      return Math.ceil(value / 15);
    }
    return 0;
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
        height={350}
      >
        {isFetching && <LoaderComponent borderRadius={5} />}

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
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              marginBottom={2}
              paddingX={2}
            >
              <Typography variant="h6" fontWeight={500} fontSize={16}>
                Porcentaje riesgo por persona
              </Typography>
              <Button
                variant={all ? "contained" : "outlined"}
                color="success"
                size="small"
                onClick={() => setAll(!all)}
              >
                Todos los usuarios
              </Button>
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
                  bgcolor={"#e76262"}
                  marginRight={1}
                />
                Promedio de % riesgo
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
                  bgcolor={"#0c4d05"}
                  marginRight={1}
                />
                Promedio de % riesgo límite
              </Typography>
            </Box>
            <ResponsiveContainer width={"99.9%"} height={300}>
              <LineChart
                data={filterData(arr)}
                margin={{
                  top: 5,
                  right: 55,
                  left: 20,
                  bottom: 135,
                }}
              >
                <XAxis
                  dataKey="nombre_completo"
                  interval={getInterval(filterData(arr).length)}
                  angle={280}
                  dx={0}
                  dy={30}
                  tick={{ fontSize: 12 }}
                  label={{
                    fontSize: "12px",
                    fontWeight: 400,
                  }}
                ></XAxis>

                <YAxis
                  yAxisId="left"
                  tick={{ fontSize: 12 }}
                  label={{
                    value: "Nivel de riesgo",
                    angle: -90,
                    dy: 35,
                    position: "insideLeft",
                    fontSize: "12px",
                    fontWeight: 400,
                  }}
                ></YAxis>

                <Tooltip
                  wrapperStyle={{ outline: "none" }}
                  content={<CustomTooltip />}
                />
                <ReferenceLine
                  y={
                    curva_limites.datos[0]
                      ?.porcentaje_promedio_con_riesgo_limite || 0
                  }
                  yAxisId="left"
                  stroke="#0c4d05"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="promedio_de_porcentaje_de_riesgo"
                  stroke="#e76262"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Box>
    </Grid>
  );
};
