import React, { useState } from "react";
import type { NextPage } from "next";
import { useDispatch } from "react-redux";
import dayjs, { Dayjs } from "dayjs";

//Components
import { DashboardLayout } from "../../components/layouts";

//Service
import {
  reportePersonasApi,
  useGetReportePersonasQuery,
} from "../../services/reportePersonas";

const UsersPage: NextPage = () => {
  const [start, setStart] = useState<Dayjs | null>(dayjs().startOf("month"));
  const [end, setEnd] = useState<Dayjs | null>(dayjs().endOf("month"));
  const dispatch = useDispatch();

  // Function get the date
  const getDate = (date: Dayjs | null, type: string): string => {
    if (date) {
      return date.format("DD-MM-YYYY");
    }
    return type === "start"
      ? dayjs().startOf("month").format("DD-MM-YYYY")
      : dayjs().endOf("month").format("DD-MM-YYYY");
  };

  // Get the data
  const { data, isLoading, error, isError, isFetching } =
    useGetReportePersonasQuery({
      desde: getDate(start, "start"),
      hasta: getDate(end, "end"),
    });

  return (
    <DashboardLayout title={"Somni Dashboard"}>
      <h1>User</h1>
    </DashboardLayout>
  );
};

export default UsersPage;
