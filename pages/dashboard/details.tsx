import React, { useState } from "react";
import type { NextPage } from "next";

//Components
import { DashboardLayout } from "../../components/layouts";

const DetailsPage: NextPage = () => {
  return (
    <DashboardLayout title={"Somni Dashboard"}>
      <h1>Details</h1>
    </DashboardLayout>
  );
};

export default DetailsPage;
