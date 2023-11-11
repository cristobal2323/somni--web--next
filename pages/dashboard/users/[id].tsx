import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

//Components
import { DashboardLayout } from "../../../components/layouts";
import { Header } from "../../../components/common/HeaderPages";

//Material
import { Box } from "@mui/material";

// Services
import { userDataApi, useGetDataUserQuery } from "../../../services/dataUser";

// Components
import { FormDataUser } from "../../../components/editUser";
import { Loader } from "../../../components/ui";

const EditUserPage: NextPage = () => {
  const dispatch = useDispatch();

  const router = useRouter();
  const { id } = router.query;

  const userId = typeof id === "string" ? id : undefined;

  // TODO: VER SI SE PUEDE HACER PARA NO ENVIAR UN STRING VACIO

  const { data, isLoading, error, isError } = useGetDataUserQuery({
    user_id: userId || "",
  });

  // Reset our state
  const resetState = (): void => {
    dispatch(userDataApi.util.resetApiState());
  };

  return (
    <DashboardLayout title={"Somni Crear usuario"}>
      <Header title={"Editar usuario"} />

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
                <FormDataUser data={data.data}  />
              </Box>
            )}
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default EditUserPage;
