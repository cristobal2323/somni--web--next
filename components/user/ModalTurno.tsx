import React, { useEffect } from "react";

//Dialog
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

//Others
import { Box, Typography } from "@mui/material";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

//styles
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

//Package
import { useForm, SubmitHandler } from "react-hook-form";

//Service
import { usePostAsignacionMutation } from "../../services/users";

//Next
import { NextPage } from "next";

type FormData = {
  turno_id: string;
};

type Turno = {
  turno_id: number;
  turno_nombre: string;
  asignado: boolean;
};

interface Props {
  handleCloseTurno: () => void;
  openTurno: boolean;
  turnos: Turno[];
  userId: number;
  turnoId: string;
}

export const ModalTurnoComponent: NextPage<Props> = ({
  openTurno,
  handleCloseTurno,
  turnos,
  userId,
  turnoId,
}) => {
  //Style
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [updateTurno, result] = usePostAsignacionMutation();

  //Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<FormData>({
    values: {
      turno_id: turnoId,
    },
  });

  useEffect(() => {
    if (result.isSuccess) {
      result.reset();
      clearErrors();
      handleCloseTurno();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  const sendTurno: SubmitHandler<FormData> = async ({ turno_id }) => {
    clearErrors();

    updateTurno({
      turno_id: parseInt(turno_id, 10),
      user_id: userId,
    });
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={openTurno}
      onClose={() => {
        clearErrors();
        handleCloseTurno();
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Cambiar tipo de turno</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Favor selecciona el tipo de turno:
        </DialogContentText>
        <Box
          marginTop={2}
          component="form"
          onSubmit={handleSubmit(sendTurno)}
          id="turnoForm"
          sx={{ display: "flex", flexWrap: "wrap", minWidth: "300px" }}
          justifyContent={"center"}
        >
          <FormControl sx={{ m: 1, minWidth: "100%" }}>
            <InputLabel id="turno-label">Turno</InputLabel>
            <Select
              color="secondary"
              {...register("turno_id", {
                required: "Este campo es requerido",
              })}
              native
              error={!!errors.turno_id}
              input={<OutlinedInput label="Turno" id="turno-label" />}
            >
              <option aria-label="None" value="" />
              {turnos.map((item) => (
                <option key={item.turno_id} value={item.turno_id}>
                  {item.turno_nombre}
                </option>
              ))}
            </Select>
            {errors.turno_id?.message && (
              <Typography fontSize={12} marginTop={0.5} color={"error"}>
                {errors.turno_id?.message}
              </Typography>
            )}
            {result.isError && (
              <Typography fontSize={12} marginTop={0.5} color={"error"}>
                Un error a ocurrido
              </Typography>
            )}
          </FormControl>
        </Box>
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
          onClick={() => {
            clearErrors();
            handleCloseTurno();
          }}
        >
          Cancelar
        </Button>
        <Button
          form={"turnoForm"}
          type="submit"
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
        >
          {result.isLoading ? "cargando" : "aceptar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
