import { NextPage } from "next";
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
}

export const ModalComponent: NextPage<Props> = ({
  openModal,
  handleCloseModal,
  isLoading,
  message,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  //   TODO: BORRAR ESTO
  let status = 0;

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
        {status === 200 ? (
          <Typography>Usuario Creado correctamente</Typography>
        ) : (
          <Typography>error al crear usuario</Typography>
        )}
      </DialogContentText>
      <DialogActions>
        <Button onClick={() => handleCloseModal()} autoFocus>
          {isLoading ? "Cargando..." : "Cerrar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
