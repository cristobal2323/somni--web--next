import React, { useState } from "react";
import type { NextPage } from "next";

//Components
import { DashboardLayout } from "../../components/layouts";

const UsersPage: NextPage = () => {
  return (
    <DashboardLayout title={"Somni Dashboard"}>
      <h1>User</h1>
    </DashboardLayout>
  );
};

export default UsersPage;
