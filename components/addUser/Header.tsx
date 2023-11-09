import React from "react";

import { Box, Typography } from "@mui/material";

export const Header = () => {
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
            Crear Operario
          </Typography>
        </div>
      </Box>
    </section>
  );
};
