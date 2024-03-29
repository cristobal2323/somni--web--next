import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";

//Date
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

/* Redux */
import { setupStore } from "../store";
import { Provider } from "react-redux";

/* Style */
import { lightTheme } from "../themes";

import "dayjs/locale/es";
import "dayjs/locale/en";

const store = setupStore();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
        <ThemeProvider theme={lightTheme}>
          <CssBaseline /> <Component {...pageProps} />
        </ThemeProvider>
      </LocalizationProvider>
    </Provider>
  );
}
