import { Box, Link, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Button, { ButtonProps } from "@mui/material/Button";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    // backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    backgroundColor: "#3d45a8",
    border: "0",
    fontSize: 16,
    color: "#fff",
    width: "200px",
    padding: "10px 12px 10px 40px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: ["Roboto"].join(","),
    "&:focus": {
      boxShadow: `${alpha("#FFFFFF", 0.1)} 0 0 0 0.1rem`,
      borderColor: "#FFFFFF",
    },
  },
}));

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText("#8A88EA"),
  width: "252px",
  marginTop: "50px",
  backgroundColor: "#8A88EA",
  "&:hover": {
    backgroundColor: "#7C7BD5",
  },
}));

export const InputComponent = () => {
  return (
    <>
      <form>
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
          <BootstrapInput id="bootstrap-input" placeholder="user@gmail.cl" />
        </Box>
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
          />
        </Box>
        <Box display={"flex"} justifyContent={"flex-end"}>
          <Link
            component="button"
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
        <ColorButton variant="contained">Iniciar sesión</ColorButton>
      </form>
    </>
  );
};
