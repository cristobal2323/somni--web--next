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
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ColorButton } from "../../utils/customButtons";

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
    console.log("add user");
  };

  // TODO: AGREGAR VALOR A LAS PASSWORD PARA QUE SE MUESTREN ******
  // TODO: TERMINAR EL AGREGAR USUARIO

  return (
    <Box
      position={"relative"}
      sx={{
        m: 2,
        p: 5,
        backgroundColor: "white",
        height: "calc(100vh - 120px)",
      }}
    >
      <Box
        sx={{
          m: 2,
          display: "flex",
          flexDirection: "row",
          gap: 15,
        }}
      >
        <FormControl>
          <TextField
            id="demo-helper-text-misaligned-no-helper"
            label="Nombre de Usuario"
            value={form.username}
            onChange={onChangeForm}
            name="username"
            sx={{ width: { sx: 250, md: 250, lg: 450 } }}
          />
        </FormControl>

        <FormControl>
          <TextField
            id="demo-helper-text-misaligned-no-helper"
            label="Nombres"
            value={form.nombres}
            onChange={onChangeForm}
            name="nombres"
            sx={{ width: { sx: 250, md: 250, lg: 450 } }}
          />
        </FormControl>
      </Box>

      <Box
        sx={{
          m: 2,
          display: "flex",
          flexDirection: "row",
          gap: 15,
        }}
      >
        <FormControl>
          <TextField
            id="demo-helper-text-misaligned-no-helper"
            label="Apellido Paterno"
            value={form.apellido_paterno}
            onChange={onChangeForm}
            name="apellido_paterno"
            sx={{ width: { sx: 250, md: 250, lg: 450 } }}
          />
        </FormControl>
        <FormControl>
          <TextField
            id="demo-helper-text-misaligned-no-helper"
            label="Apellido Materno"
            value={form.apellido_materno}
            onChange={onChangeForm}
            name="apellido_materno"
            sx={{ width: { sx: 250, md: 250, lg: 450 } }}
          />
        </FormControl>
      </Box>

      <Box
        sx={{
          m: 2,
          display: "flex",
          flexDirection: "row",
          gap: 15,
        }}
      >
        <FormControl>
          <TextField
            id="demo-helper-text-misaligned-no-helper"
            label="UID"
            value={form.uid}
            onChange={onChangeForm}
            name="uid"
            sx={{ width: { sx: 250, md: 250, lg: 450 } }}
          />
        </FormControl>
        <FormControl>
          <DatePicker
            label="Fecha Nacimiento"
            value={form.fecha_nacimiento}
            onChange={(newValue) => {
              changeDate(newValue);
            }}
            sx={{ width: { sx: 250, md: 250, lg: 450 } }}
          />
        </FormControl>
      </Box>

      <Box
        sx={{
          m: 2,
          display: "flex",
          flexDirection: "row",
          gap: 15,
        }}
      >
        <FormControl>
          <TextField
            id="demo-helper-text-misaligned-no-helper"
            label="Password"
            value={form.password}
            onChange={onChangeForm}
            name="password"
            sx={{ width: { sx: 250, md: 250, lg: 450 } }}
          />
        </FormControl>

        <FormControl>
          <TextField
            id="demo-helper-text-misaligned-no-helper"
            label="Cofirmar password"
            value={form.password_confirmation}
            onChange={onChangeForm}
            name="password_confirmation"
            sx={{ width: { sx: 250, md: 250, lg: 450 } }}
          />
        </FormControl>
      </Box>

      <Box
        sx={{
          m: 2,
          display: "flex",
          flexDirection: "row",
          gap: 15,
        }}
      >
        <FormControl>
          <TextField
            id="demo-helper-text-misaligned-no-helper"
            label="Email"
            value={form.email}
            onChange={onChangeForm}
            name="email"
            sx={{ width: { sx: 250, md: 250, lg: 450 } }}
          />
        </FormControl>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Lenguaje</InputLabel>
          <Select
            value={form.lenguaje}
            label="Lenguaje"
            name="lenguaje"
            onChange={onChangeSelect}
            sx={{ width: { sx: 250, md: 250, lg: 450 } }}
          >
            <MenuItem value={"es"}>Español</MenuItem>
            <MenuItem value={"en"}>Ingles</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <ColorButton
        variant="contained"
        sx={{ mt: 2, ml: 2 }}
        onClick={handleAddUser}
        disabled={error}
      >
        Guardar
      </ColorButton>
    </Box>
  );
};
