import React from "react";
import type { NextPage } from "next";

//Components
import { DashboardLayout } from "../../../components/layouts";
import { Header, FormComponent } from "../../../components/addUser";

//Material
import { Box } from "@mui/material";

const AddUserPage: NextPage = () => {
  return (
    <DashboardLayout title={"Somni Crear usuario"}>
      <Header />

      <Box overflow={"auto"} height={"calc(100vh - 120px)"}>
        <FormComponent />
      </Box>
    </DashboardLayout>
  );
};

export default AddUserPage;
