import { FC, PropsWithChildren } from "react";
import Head from "next/head";

import { Navbar, Menu } from "../ui";
import { Box } from "@mui/material";

interface Props extends PropsWithChildren {
  title: string;
}

export const DashboardLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Navbar />
      <Box display={"flex"}>
        <Menu />
        <Box display="flex" flex={1}>
          {children}
        </Box>
      </Box>
    </>
  );
};
