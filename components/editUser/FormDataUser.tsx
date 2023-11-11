// React
import { useState, useEffect } from "react";

// Package
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
} from "@mui/material";

// types
import { IDataUser } from "../../interfaces";
import { NextPage } from "next";
import { validations } from "../../utils";
import { ColorButton } from "../../utils/customButtons";

//Service
import { usePutOperarioMutation } from "../../services/dataUser";
import { ModalAction } from "./ModalAction";

interface Props {
  data: IDataUser;
}

interface FormData {
  username: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  uid: string;
  email: string;
  lenguaje: string;
}

export const FormDataUser: NextPage<Props> = ({ data }) => {
  const [lenguaje, setLenguaje] = useState<string>("");

  const [showModal, setShowModal] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<FormData>();

  useEffect(() => {
    setValue("username", data.datos.username);
    setValue("nombres", data.datos.nombres);
    setValue("apellido_paterno", data.datos.apellido_paterno);
    setValue("apellido_materno", data.datos.apellido_materno);
    setValue("uid", data.datos.uid);
    setValue("email", data.datos.email);

    setLenguaje(data.datos.lenguaje);
    setValue("lenguaje", data.datos.lenguaje);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.datos]);

  const [putOperario, result] = usePutOperarioMutation();

  const onChangeSelect = (event: SelectChangeEvent<string>) => {
    setLenguaje(event.target.value);
  };

  const handleUpdateUser: SubmitHandler<FormData> = async ({
    username,
    nombres,
    apellido_paterno,
    apellido_materno,
    uid,
    email,
    lenguaje,
  }) => {
    putOperario({
      username: username,
      nombres: nombres,
      apellido_paterno: apellido_paterno,
      apellido_materno: apellido_materno,
      uid: uid,
      email: email,
      lenguaje: lenguaje,
      user_id: data.datos.user_id,
    });
  };

  const onShowModal = () => setShowModal(true);

  return (
    <>
      <form onSubmit={handleSubmit(onShowModal)} noValidate>
        <Box
          position={"relative"}
          sx={{
            m: 2,
            p: 5,
            backgroundColor: "white",
            height: "calc(100vh - 250px)",
          }}
        >
          <ModalAction
            openModal={showModal}
            handleCloseModal={() => setShowModal(false)}
            handleAction={handleUpdateUser}
            result={result}
            formData={getValues()}
          />

          <Box display={"flex"} gap={3} flexDirection={"column"} width={"100%"}>
            <Box display={"flex"} gap={2}>
              <FormControl sx={{ width: "50%" }}>
                <TextField
                  {...register("username", {
                    required: "Este campo es requerido",
                  })}
                  label="Nombre de Usuario"
                  error={!!errors.username}
                />
              </FormControl>
              <FormControl sx={{ width: "50%" }}>
                <TextField
                  {...register("nombres", {
                    required: "Este campo es requerido",
                  })}
                  label="Nombres"
                  error={!!errors.nombres}
                />
              </FormControl>
            </Box>

            <Box display={"flex"} gap={2}>
              <FormControl sx={{ width: "50%" }}>
                <TextField
                  {...register("apellido_paterno", {
                    required: "Este campo es requerido",
                  })}
                  label="Apellido Paterno"
                  error={!!errors.apellido_paterno}
                />
              </FormControl>

              <FormControl sx={{ width: "50%" }}>
                <TextField
                  {...register("apellido_materno", {
                    required: "Este campo es requerido",
                  })}
                  label="Apellido Materno"
                  error={!!errors.apellido_materno}
                />
              </FormControl>
            </Box>

            <Box display={"flex"} gap={2}>
              <FormControl sx={{ width: "50%" }}>
                <TextField
                  {...register("uid", {
                    required: "Este campo es requerido",
                  })}
                  label="UID"
                  error={!!errors.uid}
                />
              </FormControl>

              <FormControl sx={{ width: "50%" }}>
                <TextField
                  {...register("email", {
                    required: "Este campo es requerido",
                    validate: validations.isEmail,
                  })}
                  label="Email"
                  error={!!errors.email}
                />
              </FormControl>
            </Box>

            <Box display={"flex"} gap={2}>
              <FormControl sx={{ width: "50%" }}>
                <InputLabel error={!!errors.lenguaje}>Lenguaje</InputLabel>
                <Select
                  {...register("lenguaje", {
                    required: "Este campo es requerido",
                  })}
                  label="Lenguaje"
                  onChange={onChangeSelect}
                  error={!!errors.lenguaje}
                  value={lenguaje}
                >
                  <MenuItem value={"es"}>Español</MenuItem>
                  <MenuItem value={"en"}>Ingles</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          <ColorButton
            type="submit"
            variant="contained"
            sx={{ mt: 5 }}
            onClick={() => {
              handleSubmit(onShowModal);
            }}
            style={{ float: "right" }}
          >
            {result.isLoading ? "Cargando..." : "Actualizar"}
          </ColorButton>
        </Box>
      </form>
    </>
  );
};
