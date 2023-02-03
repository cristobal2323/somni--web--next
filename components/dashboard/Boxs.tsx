import React from "react";

//Next
import { NextPage } from "next";

//Material
import { Grid, Typography, Box } from "@mui/material";
import SecurityUpdateWarningIcon from "@mui/icons-material/SecurityUpdateWarning";
import BeenhereIcon from "@mui/icons-material/Beenhere";

//types
import { IResumenTotales } from "../../interfaces/resumenTotales";
import { LoaderComponent } from "../ui";

interface Props {
  data: IResumenTotales;
  isFetching: boolean;
}

export const BoxsComponent: NextPage<Props> = ({ data, isFetching }) => {
  const total_controles = data.datos.totales.total_controles.valor;
  const controles_con_riesgo = data.datos.totales.controles_con_riesgo.valor;

  return (
    <Grid item={true} xs={12} sm={12} md={12} lg={3}>
      <section>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          bgcolor="#BBE7B6"
          height={180}
          borderRadius={2}
          alignItems={"center"}
          marginX={2}
          position={"relative"}
          paddingX={1}
        >
          {isFetching && <LoaderComponent borderRadius={2} />}
          <Typography fontWeight={900}>
            Total controles realizado: {total_controles}
          </Typography>
          <BeenhereIcon sx={{ color: "#ffffff" }} />
        </Box>
        <Box
          marginX={2}
          display={"flex"}
          justifyContent={"space-between"}
          marginTop={2}
          bgcolor="#E7B6B6"
          height={180}
          alignItems={"center"}
          borderRadius={2}
          paddingX={1}
          position={"relative"}
        >
          {isFetching && <LoaderComponent borderRadius={2} />}
          <Typography fontWeight={900}>
            Controles con riesgo: {controles_con_riesgo}{" "}
          </Typography>
          <SecurityUpdateWarningIcon sx={{ color: "#ffffff" }} />
        </Box>
      </section>
    </Grid>
  );
};
