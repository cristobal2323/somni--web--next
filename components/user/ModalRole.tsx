import React, { useState, useEffect } from "react";

//Dialog
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

//Others
import { Box, Typography } from "@mui/material";

//styles
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

//Package
import { useForm, SubmitHandler } from "react-hook-form";

//Service
import { usePostRolesMutation, useGetRolesQuery } from "../../services/users";

//Next
import { NextPage } from "next";

type FormData = {
  roles_id: string[];
};

interface Props {
  handleCloseRole: () => void;
  openRole: boolean;
  userId: number;
  roles: string[];
}

export const ModalRoleComponent: NextPage<Props> = ({
  openRole,
  handleCloseRole,
  userId,
  roles,
}) => {
  //state
  const [refresh, setRefresh] = useState<number>(0);

  //Style
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [updateRoles, result] = usePostRolesMutation();

  // Get the data
  const { data, isLoading, error, isError, isFetching } = useGetRolesQuery({});

  //Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    getValues,
    watch,
    reset,
  } = useForm<FormData>();

  useEffect(() => {
    reset({ roles_id: roles });
  }, [reset, roles]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      setRefresh(new Date().getTime());
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (result.isSuccess) {
      reset({ roles_id: [] });
      result.reset();
      clearErrors();
      handleCloseRole();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  const sendTurno: SubmitHandler<FormData> = async ({ roles_id }) => {
    const turnosId: number[] = [];
    if (data) {
      data.data.datos.forEach((item) => {
        if (roles_id.includes(item.codigo)) {
          turnosId.push(item.id);
        }
      });
      clearErrors();

      updateRoles({
        turnos: turnosId,
        user_id: userId,
      });
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <Typography>Cargando</Typography>;
    } else if (isError || !data) {
      return <Typography>Error</Typography>;
    } else {
      const checked = getValues().roles_id ? getValues().roles_id : [];

      return (
        <FormGroup>
          {data.data.datos.map((item) => (
            <FormControlLabel
              key={item.id}
              control={
                <Checkbox
                  {...register("roles_id")}
                  value={item.codigo}
                  checked={checked.includes(item.codigo)}
                  color={"secondary"}
                />
              }
              label={item.codigo}
            />
          ))}
        </FormGroup>
      );
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={openRole}
      onClose={() => {
        reset({ roles_id: [] });
        clearErrors();
        handleCloseRole();
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Cambiar roles </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Favor selecciona los roles:
        </DialogContentText>
        <Box
          marginTop={2}
          component="form"
          onSubmit={handleSubmit(sendTurno)}
          id="turnoForm"
          sx={{ display: "flex", flexWrap: "wrap", minWidth: "300px" }}
        >
          {renderContent()}
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
            reset({ roles_id: [] });
            clearErrors();
            handleCloseRole();
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
