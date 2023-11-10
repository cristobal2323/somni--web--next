import React from "react";
import type { NextPage } from "next";

//Components
import { DashboardLayout } from "../../../components/layouts";
import { Header } from "../../../components/common/HeaderPages";

//Material
import { Box } from "@mui/material";

const EditUserPage: NextPage = () => {
  return (
    <DashboardLayout title={"Somni Crear usuario"}>
      <Header title={"Editar usuario"} />

      <Box overflow={"auto"} height={"calc(100vh - 120px)"}>
        Hola mundo XD
      </Box>
    </DashboardLayout>
  );
};

export default EditUserPage;
