import React, { useMemo } from "react";

//Next
import { NextPage } from "next";

//Material
import { Grid, Typography, Box } from "@mui/material";

//types

import { IReportePersonas } from "../../interfaces";
import { LoaderComponent } from "../ui";

interface Props {
  data: IReportePersonas;
  isFetching: boolean;
}

export const ControlComponent: NextPage<Props> = ({ data, isFetching }) => {
  if (!data.ejecucion.estado) {
    <Typography fontWeight={900}>Ejecución false</Typography>;
  }

  const getColors = (color: string) => {
    console.log(color);
    if (color === "#000000") {
      return {
        background: "#8EB4D4",
        border: "solid 1px #ccc",
      };
    } else if (color === "#99FF66") {
      return {
        background: "#cef8b9",
        border: "solid 1px #ccc",
      };
    } else if (color.toLowerCase() === "#ab2328") {
      return {
        background: "#c99393",
        border: "solid 1px #ccc",
      };
    } else {
      return {
        background: "#fff",
        border: "solid 1px #ccc",
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
      <Box
        sx={{ marginTop: "15px" }}
        marginX={2}
        display={"flex"}
        overflow={"auto"}
      >
        {isFetching && (
          <LoaderComponent alignItems="flex-start" borderRadius={5} />
        )}
        <div>
          {data.datos.filas.map((item, index) => {
            return (
              <Box
                key={item.fila}
                className={`fila-${item.fila}`}
                display={"flex"}
                sx={{
                  position: "relative",
                }}
              >
                {item.celdas.map((celda, index2) => {
                  return (
                    <Box
                      key={index2}
                      alignItems={"center"}
                      padding={1}
                      sx={{
                        textOverflow: "ellipsis",
                        width: `${42 * celda.ancho}px`,
                        border: getColors(celda.backgound).border,
                        backgroundColor: getColors(celda.backgound).background,
                        height: "40px",
                        display: "flex",
                        position:
                          index > 2 && index2 === 0 ? "sticky" : "relative",
                        left: index > 2 && index2 === 0 ? "0px" : "auto",
                        zIndex: index > 2 && index2 === 0 ? "3" : "0",
                      }}
                    >
                      <Typography
                        sx={{
                          width: "100%",
                          textAlign: celda.align,
                          color: celda.color_letra,
                          fontWeight: celda.tipo_letra,
                          fontSize:
                            item.fila === 1 ? "14px" : celda.tamano_letra,
                          textOverflow: "ellipsis",
                        }}
                      >
                        {celda.valor}
                      </Typography>
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
