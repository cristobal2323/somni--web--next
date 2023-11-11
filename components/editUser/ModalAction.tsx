import { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
  Box,
} from "@mui/material";

import { SubmitHandler } from "react-hook-form";

//styles
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {  LoaderComponent } from "../ui";

interface FormData {
  username: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  uid: string;
  email: string;
  lenguaje: string;
}

interface Props {
  handleCloseModal: () => void;
  openModal: boolean;
  result: any;
  handleAction: SubmitHandler<FormData>;
  formData: FormData;
}

export const ModalAction: NextPage<Props> = ({
  handleCloseModal,
  openModal,
  result,
  handleAction,
  formData,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (result.isSuccess && !openModal) {
      result.reset();
    }
  }, [result, openModal]);

  const router = useRouter()

  return (
    <Dialog
      fullScreen={fullScreen}
      open={openModal}
      onClose={() => handleCloseModal()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Editar Usuario</DialogTitle>

      <DialogContentText
        id="alert-dialog-description"
        style={{ padding: "15px", }}
      >
        <Box margin={2}>
        {result.isSuccess && "Usuario editado correctamente"}
        {result.isError && "Ocurrio un error al editar el usuario"}
        {result.isUninitialized && "¿Esta seguro que desea editar el usuario?"}
        {result.isLoading && <LoaderComponent borderRadius={1} />}
        

        </Box>
      </DialogContentText>
      <DialogActions>
        {result.isSuccess ? (
          <Button
            onClick={() => {
              handleCloseModal();
              router.push("/dashboard/users");
            }}
            color="primary"
          >
            Cerrar
          </Button>
        ) : (
          <>
            <Button
              onClick={() => {
                handleCloseModal();
              }}
              color="primary"
            >
              No
            </Button>
            <Button
              onClick={() => {
                handleAction(formData);
              }}
              color="primary"
              autoFocus
            >
              Si
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};
