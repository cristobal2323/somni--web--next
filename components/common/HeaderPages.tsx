import React from "react";

import { Box, Typography } from "@mui/material";
import { NextPage } from "next";

type Props = {
  title: string;
};

export const Header: NextPage<Props> = ({title}) => {
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
            {title}
          </Typography>
        </div>
      </Box>
    </section>
  );
};
