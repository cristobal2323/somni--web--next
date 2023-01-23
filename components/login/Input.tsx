//React
import { useEffect } from "react";

//Next
import { useRouter } from "next/router";

//Material
import { Alert, AlertTitle, Box, Link, Typography } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";

//Package
import { useForm, SubmitHandler } from "react-hook-form";

//Service
import { useLoginMutation } from "../../services/login";

//Buttons
import { customButtons, validations } from "../../utils/index";

const { BootstrapInput, ColorButton } = customButtons;

type FormData = {
  email: string;
  password: string;
};

export const InputComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [login, result] = useLoginMutation();

  const { push } = useRouter();

  useEffect(() => {
    if (result.isSuccess) {
      push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  const onLoginUser: SubmitHandler<FormData> = async ({ email, password }) => {
    login({
      provider: "sistema",
      sistema: { email: email, password: password },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box position={"relative"} marginTop={5}>
          <Typography
            color="info"
            variant="body2"
            fontSize={16}
            fontWeight={100}
            sx={{ color: "#ffffff", marginTop: "10px" }}
          >
            Correo
          </Typography>
          <AccountCircleOutlinedIcon
            color="info"
            sx={{ position: "absolute", zIndex: 1, top: 30, left: 10 }}
          />
          <BootstrapInput
            {...register("email", {
              required: "Este campo es requerido",
              validate: validations.isEmail,
            })}
            id="bootstrap-input"
            placeholder="user@gmail.cl"
            error={!!errors.email}
          />
        </Box>
        {errors.email?.message && (
          <Typography fontSize={12} marginTop={0.5} color={"info.main"}>
            {errors.email?.message}
          </Typography>
        )}
        <Box marginTop={2} position={"relative"}>
          <Typography
            color="info"
            variant="body2"
            fontSize={16}
            fontWeight={100}
            sx={{ color: "#ffffff", marginTop: "10px" }}
          >
            Contraseña
          </Typography>
          <LockOpenOutlinedIcon
            color="info"
            sx={{ position: "absolute", zIndex: 1, top: 30, left: 10 }}
          />
          <BootstrapInput
            type="password"
            id="bootstrap-input"
            placeholder="******"
            error={!!errors.password}
            {...register("password", {
              required: "Este campo es requerido",
              //minLength: { value: 6, message: "Mínimo 6 caracteres" },
            })}
          />
          {errors.password?.message && (
            <Typography fontSize={12} marginTop={0.5} color={"info.main"}>
              {errors.password?.message}
            </Typography>
          )}
        </Box>
        <Box display={"flex"} justifyContent={"flex-end"} marginBottom={6}>
          <Link
            variant="body2"
            sx={{
              color: "#ffffff",
              marginTop: 2,
              fontSize: "12px",
            }}
            onClick={() => {
              console.info("I'm a button.");
            }}
          >
            ¿Olvidaste la contraseña?
          </Link>
        </Box>
        {result.isError && (
          <Alert
            variant="filled"
            severity="error"
            sx={{ fontSize: "12px", marginBottom: 1 }}
          >
            Usuario o contraseña incorrecta
          </Alert>
        )}
        <ColorButton
          type="submit"
          variant="contained"
          onClick={() => {
            if (!result.isLoading) {
              handleSubmit(onLoginUser);
            }
          }}
        >
          {result.isLoading ? "Cargando" : "Iniciar sesión"}
        </ColorButton>
      </form>
    </>
  );
};
