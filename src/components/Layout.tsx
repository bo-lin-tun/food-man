import BackofficeLayout from "@/components/BackofficeLayout";
import { useAppSelector } from "@/store/hooks";
import { Box, ThemeProvider } from "@mui/material";
import { useRouter } from "next/router";
import OrderLayout from "./OrderLayout";
import { useEffect, useState } from "react";
import { socket } from "@/utils/socket";
import { useCreateTheme } from "@/use-create-theme";
import { Table } from "@prisma/client";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const Layout = ({ children }: Props) => {
  const { theme } = useAppSelector((state) => state.app);
  const router = useRouter();
  const { tableId } = router.query;
  const isOrderApp = tableId;
  const isBackofficeApp = router.pathname.includes("/backoffice");
  const tables = useAppSelector((state) => state.table.items);
  const [curTable, setCurTable] = useState<Table>();

  const socketInitiallize = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_SOCKET_API_URL!}`);
  };

  useEffect(() => {
    if (tables.length) {
      setCurTable(tables[0]);
    }
  }, [tables]);
  console.log("test");

  useEffect(() => {
    if (curTable) {
      socketInitiallize();

      socket.auth = { locationId: curTable.locationId };

      socket.connect();

      socket.on("connect_error", (error) => {
        console.log("error: ", error);
      });

      socket.on("connect", () => {
        console.log("connected");
      });

      socket.on("disconnect", () => {
        console.log("disconnected");
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [curTable]);

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
