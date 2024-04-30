import Layout from "@/components/Layout";
import Snackbar from "@/components/Snackbar";
import { store } from "@/store";
import { theme } from "@/utils/theme";
import { ThemeProvider } from "@emotion/react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Layout>
            <ToastContainer position="bottom-right" transition={Slide} />
            <Component {...pageProps} />
            <Snackbar />
          </Layout>
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
}
