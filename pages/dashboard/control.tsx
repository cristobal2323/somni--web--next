import React, { useState } from "react";
import type { NextPage } from "next";
import { useDispatch } from "react-redux";
import dayjs, { Dayjs } from "dayjs";

//Components
import { DashboardLayout } from "../../components/layouts";
import { FilterComponent, ControlComponent } from "../../components/control";
import { Loader } from "../../components/ui";

//Service
import {
  reportePersonasApi,
  useGetReportePersonasQuery,
} from "../../services/reportePersonas";

//Material
import { Box } from "@mui/material";
import { InfoComponent } from "../../components/control/Info";

const ControlPage: NextPage = () => {
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

  // Reset our state
  const resetState = (): void => {
    dispatch(reportePersonasApi.util.resetApiState());
  };

  const changeDate = (type: string, date: Dayjs | null): void => {
    if (type === "start") {
      setStart(date);
    } else {
      setEnd(date);
    }
  };

  return (
    <DashboardLayout title={"Somni control de personas"}>
      <FilterComponent changeDate={changeDate} start={start} end={end} />
      <InfoComponent />
      {isLoading || isError ? (
        <Loader
          height="calc(100vh - 130px)"
          resetState={resetState}
          isError={isError}
          seeError={false}
          error={JSON.stringify(error)}
        />
      ) : (
        <>
          <div>
            {data && (
              <Box overflow={"auto"} height="calc(100vh - 175px)">
                <ControlComponent isFetching={isFetching} data={data.data} />
              </Box>
            )}
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default ControlPage;
