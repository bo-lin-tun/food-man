import Layout from "@/components/Layout";
import Snackbar from "@/components/Snackbar";
import { store } from "@/store";
import { ThemeProvider } from "@emotion/react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/global.css";
import { useEffect, useState } from "react";
import { useCreateTheme } from "@/use-create-theme";
import { createTheme } from "@mui/material";
import { useAppSelector } from "@/store/hooks";

const defaultTheme = createTheme({});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <Layout>
          <ToastContainer position="bottom-right" transition={Slide} />
          <Component {...pageProps} />
          <Snackbar />
        </Layout>
      </Provider>
    </SessionProvider>
  );
}
