import { Box, Typography } from "@mui/material";
import React from "react";

export const InfoComponent = () => {
  return (
    <Box marginX={2} marginTop={1}>
      <Box display={"flex"} flexWrap={"wrap"}>
        <Typography
          marginBottom={1}
          fontSize={14}
          fontWeight={400}
          display={"flex"}
          alignItems={"center"}
          marginRight={2}
        >
          <Box
            border={"solid 1px #fff"}
            component="span"
            width={14}
            height={14}
            bgcolor={"#c99393"}
            marginRight={1}
          />
          Con riesgo
        </Typography>
        <Typography
          marginBottom={1}
          marginRight={2}
          fontSize={14}
          fontWeight={400}
          display={"flex"}
          alignItems={"center"}
        >
          <Box
            border={"solid 1px #fff"}
            component="span"
            width={14}
            height={14}
            bgcolor={"#cef8b9"}
            marginRight={1}
          />
          Sin riesgo
        </Typography>
        <Typography
          marginBottom={1}
          marginRight={2}
          fontSize={14}
          fontWeight={400}
          display={"flex"}
          alignItems={"center"}
        >
          <Box
            border={"solid 1px #fff"}
            component="span"
            width={14}
            height={14}
            bgcolor={"#8EB4D4"}
            marginRight={1}
          />
          No realizo control
        </Typography>
      </Box>
      <Typography
        marginRight={2}
        fontSize={14}
        fontWeight={400}
        display={"flex"}
        alignItems={"center"}
      >
        n/m Donde n = cantidad de controles sin riesgo y m = cantidad total de
        controles
      </Typography>
    </Box>
  );
};
