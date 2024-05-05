import BackofficeLayout from "@/components/BackofficeLayout";
import { useAppSelector } from "@/store/hooks";
import { Box, ThemeProvider } from "@mui/material";
import { useRouter } from "next/router";
import OrderLayout from "./OrderLayout";
import { useCreateTheme } from "@/use-create-theme";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const Layout = ({ children }: Props) => {
  const { theme } = useAppSelector((state) => state.app);
  const router = useRouter();
  const { tableId } = router.query;
  const isOrderApp = tableId;
  const isBackofficeApp = router.pathname.includes("/backoffice");
  const primaryColor = useAppSelector((state) => state.app.primaryColor);
  const { theme: themeValue } = useCreateTheme(primaryColor);

  if (isOrderApp) {
    return (
      <ThemeProvider theme={themeValue}>
        <OrderLayout>{children}</OrderLayout>
      </ThemeProvider>
    );
  }

  if (isBackofficeApp) {
    return (
      <ThemeProvider theme={themeValue}>
        <Box
          sx={{
            height: "100%",
            backgroundColor: theme === "light" ? "info.main" : "primary.light",
          }}
        >
          <BackofficeLayout>{children}</BackofficeLayout>
        </Box>
      </ThemeProvider>
    );
  }

  return <Box>{children}</Box>;
};

export default Layout;
