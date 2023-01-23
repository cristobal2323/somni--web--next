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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
