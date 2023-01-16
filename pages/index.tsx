import Head from "next/head";

import { Box, Grid } from "@mui/material";

/* Components */
import ImageComponent from "../components/login/Image";
import LoginComponent from "../components/login/Login";
/*  Style */

import type { NextPage } from "next";

const LoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Somni</title>
      </Head>

      <Box>
        <Grid container spacing={0}>
          <ImageComponent />
          <LoginComponent />
        </Grid>
      </Box>
    </>
  );
};

export default LoginPage;
