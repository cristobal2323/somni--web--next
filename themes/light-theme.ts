import { createTheme } from "@mui/material/styles";
import { colors } from "./colors";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: colors.primary,
      light: colors.primaryLight,
    },
    secondary: {
      main: colors.secondary,
      light: colors.secondaryLight,
      dark: colors.secondaryDark,
    },
    info: {
      main: colors.info,
      light: colors.infoLight,
    },
  },
});
