import React, { useState } from "react";
import type { NextPage } from "next";

//Components
import { DashboardLayout } from "../../components/layouts";
import { FilterComponent } from "../../components/dashboard/Filter";
import { Loader } from "../../components/ui";

//Service
import { homeApi, useGetHomeQuery } from "../../services/home";
import { useDispatch } from "react-redux";

const HomePage: NextPage = () => {
  const [myState, setState] = useState("23-02-2023");
  const dispatch = useDispatch();

  const response = useGetHomeQuery({
    desde: myState,
    hasta: "31-03-2023",
  });

  const resetState = (): void => {
    dispatch(homeApi.util.resetApiState());
  };

  return (
    <DashboardLayout title={"Somni Dashboard"}>
      {response.isLoading || response.isError ? (
        <Loader
          resetState={resetState}
          isError={response.isError}
          seeError={false}
          error={JSON.stringify(response.error)}
        />
      ) : (
        <>
          <FilterComponent />
          <div>
            <button onClick={() => setState("01-01-2023")}>test</button>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default HomePage;
