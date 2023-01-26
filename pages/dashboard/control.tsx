import React, { useState } from "react";
import type { NextPage } from "next";

//Components
import { DashboardLayout } from "../../components/layouts";

const ControlPage: NextPage = () => {
  return (
    <DashboardLayout title={"Somni Dashboard"}>
      <h1>Control</h1>
    </DashboardLayout>
  );
};

export default ControlPage;
