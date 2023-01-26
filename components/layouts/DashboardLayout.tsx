import { FC, PropsWithChildren } from "react";
import Head from "next/head";

import { Navbar, Menu } from "../ui";
import { Box, useTheme } from "@mui/material";

interface Props extends PropsWithChildren {
  title: string;
}

export const DashboardLayout: FC<Props> = ({ children, title }) => {
  const theme = useTheme();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Navbar />
      <Box display={"flex"}>
        <Menu />
        <div
          className="block"
          style={{ background: theme.palette.secondary.dark }}
        >
          {children}
        </div>
      </Box>
    </>
  );
};
