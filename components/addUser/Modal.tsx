import { NextPage } from "next";
import { useRouter } from "next/router";
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  Typography,
  DialogActions,
  Button,
} from "@mui/material";

//styles
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

interface Props {
  handleCloseModal: () => void;
  openModal: boolean;
  isLoading: boolean;
  message: string;
  result: any;
}

export const ModalComponent: NextPage<Props> = ({
  openModal,
  handleCloseModal,
  isLoading,
  message,
  result,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const router = useRouter();

  return (
    <Dialog
      fullScreen={fullScreen}
      open={openModal}
      onClose={() => handleCloseModal()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Crear Usuario</DialogTitle>

      <DialogContentText
        id="alert-dialog-description"
        style={{ padding: "15px" }}
      >
        {result.data?.data.ejecucion.estado ? (
          <Typography>Usuario Creado correctamente</Typography>
        ) : (
          <Typography>{message}</Typography>
        )}
      </DialogContentText>
      <DialogActions>
        <Button
          onClick={() =>
            result.data?.data.ejecucion.estado
              ? (handleCloseModal(), router.push("/dashboard/users"))
              : handleCloseModal()
          }
          autoFocus
        >
          {isLoading ? "Cargando..." : "Cerrar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
