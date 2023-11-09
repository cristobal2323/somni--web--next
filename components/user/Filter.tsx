import React from "react";

//Next
import NextLink from "next/link";
import { NextPage } from "next";

import TextField from "@mui/material/TextField";
import { Box, Typography } from "@mui/material";
import { ColorButton } from "../../utils/customButtons";

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
        <div className="flex" style={{ alignItems: "center" }}>
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

          <Box>
            <TextField
              value={search}
              onChange={(e) => {
                changeInputSearch(e.target.value);
              }}
              color={"secondary"}
              helperText={null}
              label="Buscar"
              sx={{
                backgroundColor: "info.main",
                ml: 2,
              }}
            />
          </Box>
        </div>
        <Box alignItems={"center"} marginRight={2}>
          <NextLink href="/dashboard/users/add-user">
            <Box>
              <ColorButton>Agregar Usuario</ColorButton>
            </Box>
          </NextLink>
        </Box>
      </Box>
    </section>
  );
};
