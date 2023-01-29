import React, { useMemo } from "react";

//Next
import { NextPage } from "next";

//Material
import { Grid, Typography, Box } from "@mui/material";

//types

import { IReporteDetalle } from "../../interfaces";
import { LoaderComponent } from "../ui";

interface Props {
  data: IReporteDetalle;
  isFetching: boolean;
}

export const TableComponent: NextPage<Props> = ({ data, isFetching }) => {
  if (!data.ejecucion.estado) {
    <Typography fontWeight={900}>Ejecución false</Typography>;
  }

  const getColors = (color: string, fila: number, celda: number) => {
    if (fila === 1) {
      return {
        background: "#8EB4D4",
        border: "solid 1px #D9DEE8",
        color: "#fff",
      };
    }
    if (celda === 0 || celda === 1) {
      return {
        background: "#8EB4D4",
        border: "solid 1px #D9DEE8",
        color: "#fff",
      };
    } else if (color === "#99FF66") {
      return {
        background: "#cef8b9",
        border: "solid 1px #D9DEE8",
        color: "#000",
      };
    } else if (color.toLowerCase() === "#ab2328") {
      return {
        background: "#c99393",
        border: "solid 1px #D9DEE8",
        color: "#000",
      };
    } else {
      return {
        background: "#fff",
        border: "solid 1px #D9DEE8",
        color: "#000",
      };
    }
  };

  return (
    <Grid
      container
      display={"flex"}
      justifyContent={"center"}
      position={"relative"}
    >
      <Box sx={{ marginTop: 3 }} marginX={2} display={"flex"} overflow={"auto"}>
        {isFetching && (
          <LoaderComponent alignItems="flex-start" borderRadius={5} />
        )}
        <div>
          {data.datos.filas.map((item, index) => {
            return (
              <Box
                key={item.fila}
                display={"flex"}
                className={`fila-${item.fila}`}
                style={{
                  position: index < 1 ? "sticky" : "relative",
                  top: index < 1 ? `${index * 50}px` : "auto",
                  zIndex: index < 1 ? "3" : "0",
                  height: index < 1 ? "60px" : "auto",
                }}
              >
                {item.celdas.map((celda, index2) => {
                  return (
                    <Box
                      justifyContent={"center"}
                      alignItems={"center"}
                      key={index2}
                      padding={1}
                      paddingY={1.5}
                      style={{
                        width: `${35 * celda.ancho}px`,
                        border: getColors(celda.backgound, item.fila, index2)
                          .border,
                        backgroundColor: getColors(
                          celda.backgound,
                          item.fila,
                          index2
                        ).background,
                        color: getColors(celda.backgound, item.fila, index2)
                          .color,
                        fontWeight: 400,
                        textAlign: celda.align,
                        display: "flex",
                        fontSize: celda.tamano_letra,
                        position: index2 < 3 ? "sticky" : "relative",
                        left:
                          index2 === 2
                            ? "225px"
                            : "auto"
                            ? index2 === 1
                              ? "125px"
                              : "auto"
                              ? index2 === 0
                                ? "0px"
                                : "auto"
                              : "auto"
                            : "auto",
                        zIndex: index2 < 3 ? "99" : "0",
                      }}
                    >
                      {celda.valor}
                    </Box>
                  );
                })}
              </Box>
            );
          })}
        </div>
      </Box>
    </Grid>
  );
};
