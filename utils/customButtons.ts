import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Button, { ButtonProps } from "@mui/material/Button";

export const BootstrapInput = styled(InputBase)(({ theme, error }) => {
  return {
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      // backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
      backgroundColor: "#3d45a8",
      border: error ? `solid 1px ${theme.palette.error.main}` : "0",
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
        borderColor: error ? theme.palette.error.main : "#FFFFFF",
      },
    },
  };
});

export const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText("#8A88EA"),
  width: "252px",
  backgroundColor: "#8A88EA",
  "&:hover": {
    backgroundColor: "#7C7BD5",
  },
}));
