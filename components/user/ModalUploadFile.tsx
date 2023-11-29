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
  Box,
} from "@mui/material";

//styles
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { LoaderComponent } from "../ui";

interface Props {
  handleCloseUpload: () => void;
  openUpload: boolean;
  result: any;
}

export const ModalUploadFileComponent: NextPage<Props> = ({
  openUpload,
  handleCloseUpload,
  result,
}) => {
  //Style
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (result.isSuccess && openUpload === false) {
      result.reset();
    }
  }, [result, openUpload]);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={openUpload}
      onClose={handleCloseUpload}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Carga masiva de Usuarios
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          style={{ padding: "15px" }}
        >
          <Box margin={2}>
            {result.isSuccess && "Se han cargado los usuarios correctamente"}
            {result.isError && "Ha ocurrido un error al cargar los usuarios"}
            {result.isLoading && <LoaderComponent borderRadius={1} />}
          </Box>
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
          onClick={handleCloseUpload}
        >
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
