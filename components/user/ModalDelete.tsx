import { useEffect } from "react";
import { NextPage } from "next";

// Dialog
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

//styles
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { useDeleteOperarioMutation } from "../../services/users";

interface Props {
  handleCloseDelete: () => void;
  openDelete: boolean;
  userId: number;
}

export const ModalDeleteComponent: NextPage<Props> = ({
  openDelete,
  handleCloseDelete,
  userId,
}) => {
  const [deleteUser, result] = useDeleteOperarioMutation();

  //Style
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (result.isSuccess) {
      handleCloseDelete();
      result.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  const handleDeleteUser = () => {
    deleteUser({
      user_id: userId,
    });
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={openDelete}
      onClose={handleCloseDelete}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Eliminar usuario</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          ¿Está seguro que desea eliminar el usuario?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color={"secondary"}
          sx={{
            "&:hover": {
              color: "secondary.light",
              cursor: "pointer",
            },
          }}
          onClick={handleCloseDelete}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          color={"secondary"}
          sx={{
            "&:hover": {
              backgroundColor: "secondary.light",
              color: "info.main",
              cursor: "pointer",
            },
          }}
          autoFocus
          onClick={handleDeleteUser}
        >
          {result.isLoading ? "Cargando" : "Eliminar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
