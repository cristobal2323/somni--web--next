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

interface Props {
  handleCloseCheck: () => void;
  openCheck: boolean;
}

export const ModalCheckComponent: NextPage<Props> = ({
  openCheck,
  handleCloseCheck,
}) => {
  //Style
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={openCheck}
      onClose={handleCloseCheck}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Modal Informativo</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Asegurese de haber ingresado un archivo .csv .xls o .xlsx
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
          onClick={handleCloseCheck}
        >
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
