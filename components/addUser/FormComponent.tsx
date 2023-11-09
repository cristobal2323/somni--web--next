import React, { useState, useEffect } from "react";
import { Dayjs } from "dayjs";

//Next
import { NextPage } from "next";

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

interface FormState {
  username: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  uid: string;
  fecha_nacimiento: Dayjs | null;
  email: string;
  password: string;
  password_confirmation: string;
  lenguaje: string;
}

export const FormComponent: NextPage = () => {
  const [error, setError] = useState(true);
  const [errorPassword, setErrorPassword] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const [addOperario, result] = usePostAddOperarioMutation();

  useEffect(() => {
    if (result.isSuccess) {
      setShowModal(true);
    }
  }, [result.isSuccess]);

  const [form, setForm] = useState<FormState>({
    username: "",
    nombres: "",
    apellido_paterno: "",
    apellido_materno: "",
    uid: "",
    fecha_nacimiento: null,
    email: "",
    password: "",
    password_confirmation: "",
    lenguaje: "",
  });

  useEffect(() => {
    if (
      form.username !== "" &&
      form.nombres !== "" &&
      form.apellido_paterno !== "" &&
      form.apellido_materno !== "" &&
      form.uid !== "" &&
      form.fecha_nacimiento !== null &&
      form.email !== "" &&
      form.password !== "" &&
      form.password_confirmation !== "" &&
      form.lenguaje !== ""
    ) {
      setError(false);
    } else {
      setError(true);
    }
  }, [form]);

  useEffect(() => {
    if (form.password !== form.password_confirmation) {
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
    }
  }, [form.password, form.password_confirmation]);

  const handleShowPassword = () => {
    setShow(!show);
  };

  const handleShowPassword2 = () => {
    setShow2(!show2);
  };

  const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeSelect = (event: SelectChangeEvent<string>) => {
    setForm({
      ...form,
      lenguaje: event.target.value,
    });
  };

  const changeDate = (date: Dayjs | null): void => {
    setForm({
      ...form,
      fecha_nacimiento: date,
    });
  };

  const handleAddUser = () => {
    const empresaId = getCookies().empresa_id ?? "";

    addOperario({
      username: form.username,
      nombres: form.nombres,
      apellido_paterno: form.apellido_paterno,
      apellido_materno: form.apellido_materno,
      uid: form.uid,
      fecha_nacimiento: form.fecha_nacimiento?.format("DD-MM-YYYY") ?? "",
      email: form.email,
      password: form.password,
      password_confirmation: form.password_confirmation,
      lenguaje: form.lenguaje,
      empresa_id: empresaId,
    });
  };

  return (
    <Box
      position={"relative"}
      sx={{
        m: 2,
        p: 5,
        backgroundColor: "white",
        height: "calc(100vh - 250px)",
      }}
    >
      <ModalComponent
        openModal={showModal}
        handleCloseModal={() => setShowModal(false)}
        isLoading={result.isLoading}
        message={
          result?.data?.data.ejecucion.mensaje ?? "Hable con el administrador"
        }
        result={result}
      />

      <Box display={"flex"} gap={3} flexDirection={"column"} width={"100%"}>
        <Box display={"flex"} gap={2}>
          <FormControl sx={{ width: "50%" }}>
            <TextField
              label="Nombre de Usuario"
              value={form.username}
              onChange={onChangeForm}
              name="username"
            />
          </FormControl>

          <FormControl sx={{ width: "50%" }}>
            <TextField
              label="Nombres"
              value={form.nombres}
              onChange={onChangeForm}
              name="nombres"
            />
          </FormControl>
        </Box>

        <Box display={"flex"} gap={2}>
          <FormControl sx={{ width: "50%" }}>
            <TextField
              label="Apellido Paterno"
              value={form.apellido_paterno}
              onChange={onChangeForm}
              name="apellido_paterno"
            />
          </FormControl>

          <FormControl sx={{ width: "50%" }}>
            <TextField
              label="Apellido Materno"
              value={form.apellido_materno}
              onChange={onChangeForm}
              name="apellido_materno"
            />
          </FormControl>
        </Box>

        <Box display={"flex"} gap={2}>
          <FormControl sx={{ width: "50%" }}>
            <TextField
              label="UID"
              value={form.uid}
              onChange={onChangeForm}
              name="uid"
            />
          </FormControl>

          <FormControl sx={{ width: "50%" }}>
            <DatePicker
              label="Fecha Nacimiento"
              value={form.fecha_nacimiento}
              onChange={(newValue) => {
                changeDate(newValue);
              }}
            />
          </FormControl>
        </Box>

        <Box display={"flex"} gap={2}>
          <FormControl sx={{ width: "50%" }}>
            <TextField
              label="Password"
              value={form.password}
              onChange={onChangeForm}
              name="password"
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
            />
          </FormControl>

          <FormControl sx={{ width: "50%" }}>
            <TextField
              label="Cofirmar password"
              value={form.password_confirmation}
              onChange={onChangeForm}
              name="password_confirmation"
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
            />
          </FormControl>
        </Box>
        <Box display={"flex"} gap={2}>
          <FormControl sx={{ width: "50%" }}>
            <TextField
              label="Email"
              value={form.email}
              onChange={onChangeForm}
              name="email"
            />
          </FormControl>

          <FormControl sx={{ width: "50%" }}>
            <InputLabel>Lenguaje</InputLabel>
            <Select
              value={form.lenguaje}
              label="Lenguaje"
              name="lenguaje"
              onChange={onChangeSelect}
            >
              <MenuItem value={"es"}>Español</MenuItem>
              <MenuItem value={"en"}>Ingles</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {errorPassword && (
        <Typography sx={{ mt: 2, color: "red" }}>
          Las contraseñas deben ser iguales
        </Typography>
      )}

      <ColorButton
        variant="contained"
        sx={{ mt: 5 }}
        onClick={() => {
          handleAddUser();
        }}
        disabled={error}
        style={{ float: "right" }}
      >
        {result.isLoading ? "Cargando..." : "Guardar"}
      </ColorButton>
    </Box>
  );
};
