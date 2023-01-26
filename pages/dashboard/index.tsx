import React, { useState } from "react";
import type { NextPage } from "next";
import { useDispatch } from "react-redux";
import dayjs, { Dayjs } from "dayjs";

//Components
import { DashboardLayout } from "../../components/layouts";
import {
  FilterComponent,
  BoxsComponent,
  TiempoComponent,
  PersonasComponent,
} from "../../components/dashboard";
import { Loader } from "../../components/ui";

//Service
import { homeApi, useGetHomeQuery } from "../../services/home";

//Material
import { Box, Grid } from "@mui/material";

const HomePage: NextPage = () => {
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
  const { data, isLoading, error, isError, isFetching } = useGetHomeQuery({
    desde: getDate(start, "start"),
    hasta: getDate(end, "end"),
  });

  // Reset our state
  const resetState = (): void => {
    dispatch(homeApi.util.resetApiState());
  };

  const changeDate = (type: string, date: Dayjs | null): void => {
    if (type === "start") {
      setStart(date);
    } else {
      setEnd(date);
    }
  };

  console.log(data, error);
  return (
    <DashboardLayout title={"Somni Dashboard"}>
      <FilterComponent changeDate={changeDate} start={start} end={end} />
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
              <Box overflow={"auto"} height="calc(100vh - 120px)">
                <Grid container spacing={0} marginTop={2}>
                  <BoxsComponent
                    isFetching={isFetching}
                    data={data.data.resumenTotales}
                  />
                  <TiempoComponent
                    isFetching={isFetching}
                    data={data.data.resumenTiempo}
                  />

                  <PersonasComponent
                    isFetching={isFetching}
                    data={data.data.resumenPersonas}
                  />

                  {/* 
                  <PersonasComponent
                    isFetching={isFetching}
                    data={data.data.resumenPersonas}
                  /> */}
                </Grid>
              </Box>
            )}
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default HomePage;
