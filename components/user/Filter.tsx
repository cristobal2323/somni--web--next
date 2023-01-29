import React, { useState } from "react";

//Next
import { NextPage } from "next";

import TextField from "@mui/material/TextField";
import { Box, Typography } from "@mui/material";

interface Props {
  search: string;
  changeInputSearch: (value: string) => void;
}

export const FilterComponent: NextPage<Props> = ({
  search,
  changeInputSearch,
}) => {
  return (
    <section className="container">
      <Box
        display={"flex"}
        flex={1}
        paddingRight={2}
        paddingTop={2}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <div className="flex">
          <Typography
            color="primary.main"
            marginLeft={2}
            variant="h4"
            textAlign={"center"}
            fontSize={"30px"}
            fontWeight={200}
            sx={{
              display: { xs: "none", sm: "none", md: "none", lg: "block" },
            }}
          >
            Listado de usuarios
          </Typography>
        </div>
        <div className="flex">
          <Box>
            <TextField
              value={search}
              onChange={(e) => {
                changeInputSearch(e.target.value);
              }}
              color={"secondary"}
              helperText={null}
              label="buscar"
              sx={{
                backgroundColor: "info.main",
              }}
            />
          </Box>
        </div>
      </Box>
    </section>
  );
};
