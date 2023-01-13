import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";

/* Redux */
import { setupStore } from "../store";
import { Provider } from "react-redux";

/* Style */
import { lightTheme } from "../themes";

const store = setupStore();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline /> <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
