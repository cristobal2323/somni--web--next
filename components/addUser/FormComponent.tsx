import React, { useState, useEffect } from "react";
import { Dayjs } from "dayjs";

//Package
import { useForm, SubmitHandler } from "react-hook-form";

//Material
import {
  Box,
  FormControl,
  Select,
  TextField,
  SelectChangeEvent,
  MenuItem,
  InputLabel,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// Components
import { ColorButton } from "../../utils/customButtons";

//  Service
import { usePostAddOperarioMutation } from "../../services/users";
import { ModalComponent } from "./index";
import { getCookies } from "cookies-next";

import { validations } from "../../utils/index";

interface FormData {
  username: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  uid: string;
  fecha_nacimiento: Dayjs | null | string;
  email: string;
  password: string;
  password_confirmation: string;
  lenguaje: string;
}

export const FormComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    watch,
    trigger,
  } = useForm<FormData>();

  const [date, setDate] = useState<Dayjs | null>(null);

  const [lenguaje, setLenguaje] = useState<string>("");

  const [errorPassword, setErrorPassword] = useState<boolean>(false);

  const [showModal, setShowModal] = useState<boolean>(false);

  const [show, setShow] = useState<boolean>(false);
  const [show2, setShow2] = useState<boolean>(false);

  const [addOperario, result] = usePostAddOperarioMutation();

  useEffect(() => {
    if (result.isSuccess) {
      setShowModal(true);
    }
  }, [result.isSuccess]);

  const handleShowPassword = () => {
    setShow(!show);
  };

  const handleShowPassword2 = () => {
    setShow2(!show2);
  };

  const changeDate = (date: Dayjs | null): void => {
    setDate(date);
  };

  const onChangeSelect = (event: SelectChangeEvent<string>) => {
    setLenguaje(event.target.value);
  };

  const handleAddUser: SubmitHandler<FormData> = async ({
    username,
    nombres,
    apellido_paterno,
    apellido_materno,
    uid,
    email,
    password,
    password_confirmation,
  }) => {
    const empresaId = getCookies().empresa_id ?? "";

    addOperario({
      username: username,
      nombres: nombres,
      apellido_paterno: apellido_paterno,
      apellido_materno: apellido_materno,
      uid: uid,
      fecha_nacimiento: date?.format("DD-MM-YYYY") ?? "",
      email: email,
      password: password,
      password_confirmation: password_confirmation,
      lenguaje: lenguaje,
      empresa_id: empresaId,
    });
  };

  const password = watch("password", "");
  const password_confirmation = watch("password_confirmation", "");

  useEffect(() => {
    if (touchedFields.password || touchedFields.password_confirmation) {
      trigger(["password", "password_confirmation"]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password, password_confirmation, touchedFields, trigger]);

  useEffect(() => {
    if (password === password_confirmation) {
      setErrorPassword(false);
    } else {
      setErrorPassword(true);
    }
  }, [password, password_confirmation]);

  return (
    <>
      <form onSubmit={handleSubmit(handleAddUser)} noValidate>
        <Box
          position={"relative"}
          sx={{
            m: { sx: 0, sm: 2, md: 2, lg: 2 },
            p: 5,
            backgroundColor: "white",
            height: { sx: "auto", sm: "auto", md: "auto", lg: "auto" },
          }}
        >
          <ModalComponent
            openModal={showModal}
            handleCloseModal={() => setShowModal(false)}
            isLoading={result.isLoading}
            message={
              result?.data?.data.ejecucion.mensaje ??
              "Hable con el administrador"
            }
            result={result}
          />

          <Box display={"flex"} gap={3} flexDirection={"column"} width={"100%"}>
            <Box
              display={"flex"}
              gap={2}
              sx={{
                flexDirection: {
                  xs: "column",
                  sm: "row",
                  md: "row",
                  lg: "row",
                },
              }}
            >
              <FormControl sx={{ width: { sx: "100%", sm: "50%" } }}>
                <TextField
                  {...register("username", {
                    required: "Este campo es requerido",
                  })}
                  label="Nombre de Usuario"
                  error={!!errors.username}
                />
              </FormControl>
              <FormControl sx={{ width: { sx: "100%", sm: "50%" } }}>
                <TextField
                  {...register("nombres", {
                    required: "Este campo es requerido",
                  })}
                  label="Nombres"
                  error={!!errors.nombres}
                />
              </FormControl>
            </Box>

            <Box
              display={"flex"}
              gap={2}
              sx={{
                flexDirection: {
                  xs: "column",
                  sm: "row",
                  md: "row",
                  lg: "row",
                },
              }}
            >
              <FormControl sx={{ width: { sx: "100%", sm: "50%" } }}>
                <TextField
                  {...register("apellido_paterno", {
                    required: "Este campo es requerido",
                  })}
                  label="Apellido Paterno"
                  error={!!errors.apellido_paterno}
                />
              </FormControl>

              <FormControl sx={{ width: { sx: "100%", sm: "50%" } }}>
                <TextField
                  {...register("apellido_materno", {
                    required: "Este campo es requerido",
                  })}
                  label="Apellido Materno"
                  error={!!errors.apellido_materno}
                />
              </FormControl>
            </Box>

            <Box
              display={"flex"}
              gap={2}
              sx={{
                flexDirection: {
                  xs: "column",
                  sm: "row",
                  md: "row",
                  lg: "row",
                },
              }}
            >
              <FormControl sx={{ width: { sx: "100%", sm: "50%" } }}>
                <TextField
                  {...register("uid", {
                    required: "Este campo es requerido",
                  })}
                  label="UID"
                  error={!!errors.uid}
                />
              </FormControl>

              <FormControl sx={{ width: { sx: "100%", sm: "50%" } }}>
                <DatePicker
                  label="Fecha Nacimiento"
                  value={date}
                  onChange={(newValue) => {
                    changeDate(newValue);
                  }}
                  slotProps={{
                    textField: {
                      ...register("fecha_nacimiento", {
                        required: "Este campo es requerido",
                      }),
                      variant: "outlined",
                      error: !!errors.fecha_nacimiento,
                    },
                  }}
                />
              </FormControl>
            </Box>

            <Box
              display={"flex"}
              gap={2}
              sx={{
                flexDirection: {
                  xs: "column",
                  sm: "row",
                  md: "row",
                  lg: "row",
                },
              }}
            >
              <FormControl sx={{ width: { sx: "100%", sm: "50%" } }}>
                <TextField
                  {...register("password", {
                    required: "Este campo es requerido",
                  })}
                  label="Password"
                  type={show ? "text" : "password"}
                  InputProps={{
                    endAdornment: show ? (
                      <VisibilityOff
                        style={{ cursor: "pointer" }}
                        onClick={handleShowPassword}
                      />
                    ) : (
                      <Visibility
                        style={{ cursor: "pointer" }}
                        onClick={handleShowPassword}
                      />
                    ),
                  }}
                  error={!!errors.password}
                />
              </FormControl>

              <FormControl sx={{ width: { sx: "100%", sm: "50%" } }}>
                <TextField
                  {...register("password_confirmation", {
                    required: "Este campo es requerido",
                  })}
                  label="Cofirmar password"
                  type={show2 ? "text" : "password"}
                  InputProps={{
                    endAdornment: show2 ? (
                      <VisibilityOff
                        style={{ cursor: "pointer" }}
                        onClick={handleShowPassword2}
                      />
                    ) : (
                      <Visibility
                        style={{ cursor: "pointer" }}
                        onClick={handleShowPassword2}
                      />
                    ),
                  }}
                  error={!!errors.password_confirmation}
                />
              </FormControl>
            </Box>
            <Box
              display={"flex"}
              gap={2}
              sx={{
                flexDirection: {
                  xs: "column",
                  sm: "row",
                  md: "row",
                  lg: "row",
                },
              }}
            >
              <FormControl sx={{ width: { sx: "100%", sm: "50%" } }}>
                <TextField
                  {...register("email", {
                    required: "Este campo es requerido",
                    validate: validations.isEmail,
                  })}
                  label="Email"
                  error={!!errors.email}
                />
              </FormControl>

              <FormControl sx={{ width: { sx: "100%", sm: "50%" } }}>
                <InputLabel error={!!errors.lenguaje}>Lenguaje</InputLabel>
                <Select
                  {...register("lenguaje", {
                    required: "Este campo es requerido",
                  })}
                  label="Lenguaje"
                  onChange={onChangeSelect}
                  error={!!errors.lenguaje}
                  defaultValue=""
                >
                  <MenuItem value={""}>Seleccione</MenuItem>
                  <MenuItem value={"es"}>Español</MenuItem>
                  <MenuItem value={"en"}>Ingles</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {errorPassword && (
              <Typography sx={{ mt: 2, color: "red" }}>
                Las contraseñas deben ser iguales
              </Typography>
            )}

            <Box>
              <ColorButton
                type="submit"
                variant="contained"
                sx={{ mt: 5 }}
                onClick={() => {
                  handleSubmit(handleAddUser);
                }}
                style={{ float: "right" }}
              >
                {result.isLoading ? "Cargando..." : "Guardar"}
              </ColorButton>
            </Box>
          </Box>
        </Box>
      </form>
    </>
  );
};
