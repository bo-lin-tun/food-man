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

  useEffect(() => {
    if (curTable) {
      socketInitiallize().then((res) => {});
      socket.auth = { locationId: curTable.locationId };

      socket.connect();

      socket.on("connect_error", (error) => {
        console.log("err: ", error.message);
        console.log("err name: ", error.name);
        console.log("err cuase", error.cause);
        console.log("error stack: ", error.stack);
      });

      socket.on("connect", () => {
        console.log("socket connected");
      });

      socket.on("disconnect", () => {
        console.log("socket disconnected");
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
