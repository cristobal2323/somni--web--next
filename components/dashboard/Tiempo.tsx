import React, { useMemo } from "react";

//Next
import { NextPage } from "next";

//Material
import { Grid, Typography, Box } from "@mui/material";

import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ResponsiveContainer,
  ReferenceLine,
  ComposedChart,
  TooltipProps,
} from "recharts";

//types

import { IResumenTiempo } from "../../interfaces";
import { LoaderComponent } from "../ui";

interface IResumenPorcentajePersonas {
  fecha: string;
  q_con_riesgo: number;
  q_sin_riesgo: number;
  porcentaje_promedio_con_riesgo_limite: number;
  promedio_de_porcentaje_de_riesgo: number;
}

interface Props {
  data: IResumenTiempo;
  isFetching: boolean;
}

export const TiempoComponent: NextPage<Props> = ({ data, isFetching }) => {
  const { datos } = data;
  const {
    barra_controles,
    curva_porcentaje_promedio_con_riesgo_limite,
    curva_promedio_de_porcentaje_de_riesgo,
  } = datos;

  let arr: IResumenPorcentajePersonas[] = [];

  arr = useMemo(() => {
    let memory: IResumenPorcentajePersonas[] = [];
    barra_controles.datos.forEach((element, i) => {
      let index = curva_porcentaje_promedio_con_riesgo_limite.datos.findIndex(
        (o) => o.fecha === element.fecha
      );

      const cp =
        curva_promedio_de_porcentaje_de_riesgo.datos[index]
          .promedio_de_porcentaje_de_riesgo;

      let clone = {
        fecha: element.fecha || "",
        q_con_riesgo: element.q_con_riesgo || 0,
        q_sin_riesgo: element.q_con_riesgo || 0,
        porcentaje_promedio_con_riesgo_limite:
          index >= 0
            ? curva_porcentaje_promedio_con_riesgo_limite.datos[index]
                .porcentaje_promedio_con_riesgo_limite || 0
            : 0,
        promedio_de_porcentaje_de_riesgo:
          index >= 0 ? (cp ? parseFloat(cp) : 0) : 0,
      };

      memory.push(clone);
    });
    return memory;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const getInterval = (value: number): number => {
    if (value > 31) {
      return Math.ceil(value / 31);
    }
    return 0;
  };

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
          >{`Fecha: ${label}`}</Typography>
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
              bgcolor={"#118dff"}
              marginRight={1}
            />{" "}
            Con riesgo: {payload[0]?.payload?.q_con_riesgo}
          </Typography>
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
              bgcolor={"#4673f0"}
              marginRight={1}
            />{" "}
            Sin riesgo: {payload[0]?.payload?.q_sin_riesgo}
          </Typography>
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

  return (
    <Grid item={true} xs={12} sm={12} md={12} lg={9}>
      <Box
        position={"relative"}
        marginX={2}
        paddingY={2}
        bgcolor={"info.main"}
        sx={{ marginTop: { xs: "16px", sm: "16px", md: "16px", lg: "0px" } }}
        borderRadius={3}
        height={378}
        border={"solid 1px #ccc"}
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
            <Box display={"flex"} justifyContent={"center"} marginBottom={1}>
              <Typography variant="h6" fontWeight={500} fontSize={16}>
                Controles realizados en el tiempo
              </Typography>
            </Box>

            <ResponsiveContainer width={"99%"} height={280}>
              <ComposedChart
                data={arr}
                margin={{
                  bottom: 70,
                  right: 25,
                  left: 25,
                }}
              >
                {/* <CartesianGrid stroke="#f5f5f5" /> */}
                <XAxis
                  dataKey="fecha"
                  tick={{ fontSize: 12 }}
                  interval={getInterval(arr.length)}
                  angle={280}
                  dx={0}
                  dy={30}
                />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  tick={{ fontSize: 12 }}
                  label={{
                    value: "Nivel de riesgo en %",
                    angle: -90,
                    dy: 100,
                    position: "insideLeft",
                    fontWeight: 400,
                    //fill: "#4673f0",
                  }}
                />
                <YAxis
                  yAxisId="right"
                  tick={{ fontSize: 12 }}
                  orientation="right"
                  label={{
                    value: "Cantida de controles",
                    angle: 90,
                    dy: 100,
                    position: "insideRight",
                    fontWeight: 400,
                    //fill: "#4673f0",
                  }}
                />
                <Tooltip
                  wrapperStyle={{ outline: "none" }}
                  content={<CustomTooltip />}
                />
                <ReferenceLine
                  y={
                    datos.curva_porcentaje_promedio_con_riesgo_limite.datos
                      .length > 0
                      ? datos.curva_porcentaje_promedio_con_riesgo_limite
                          .datos[0].porcentaje_promedio_con_riesgo_limite
                      : 0
                  }
                  stroke="#0c4d05"
                  yAxisId="left"
                />
                <Bar
                  stackId="a"
                  dataKey="q_con_riesgo"
                  fill="#118dff"
                  yAxisId="right"
                />
                <Bar
                  stackId="a"
                  dataKey="q_sin_riesgo"
                  fill="#4673f0"
                  yAxisId="right"
                />
                {/* <Bar
              stroke="#000"
              dataKey="porcentaje_promedio_con_riesgo_limite"
              yAxisId="left"
            /> */}
                <Line
                  type="monotone"
                  dataKey="promedio_de_porcentaje_de_riesgo"
                  stroke="#e76262"
                  yAxisId="left"
                />
              </ComposedChart>
            </ResponsiveContainer>
            <Box display={"flex"} justifyContent={"center"} flexWrap={"wrap"}>
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
          </div>
        </div>
      </Box>
    </Grid>
  );
};
