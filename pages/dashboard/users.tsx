import React, { useState } from "react";
import type { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";

//Components
import { DashboardLayout } from "../../components/layouts";
import { FilterComponent, TableComponent } from "../../components/user";
import { Loader } from "../../components/ui";

//Service
import { usersApi, useGetUsersQuery } from "../../services/users";

// Types
import type { RootState } from "../../store";

//Material
import { Box } from "@mui/material";

const UsersPage: NextPage = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>("");

  const empresa_id = useSelector((state: RootState) => state.home.empresa_id);

  // Get the data
  const { data, isLoading, error, isError, isFetching } = useGetUsersQuery({
    empresa_id: empresa_id,
    filtro: "",
    reg_inicio: 1,
    reg_fin: 1000,
  });

  // Reset our state
  const resetState = (): void => {
    dispatch(usersApi.util.resetApiState());
  };

  const changeInputSearch = (value: string): void => {
    setSearch(value);
  };

  return (
    <DashboardLayout title={"Somni Dashboard"}>
      <FilterComponent search={search} changeInputSearch={changeInputSearch} />

      {isLoading || isError ? (
        <Loader
          height="calc(100vh - 120px)"
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
                <TableComponent
                  search={search}
                  isFetching={isFetching}
                  data={data.data}
                />
              </Box>
            )}
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default UsersPage;
