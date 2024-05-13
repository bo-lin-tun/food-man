import BackofficeLayout from "@/components/BackofficeLayout";
import { useAppSelector } from "@/store/hooks";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import OrderLayout from "./OrderLayout";
import { useEffect } from "react";
import { socket } from "@/utils/socket";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const Layout = ({ children }: Props) => {
  const { theme } = useAppSelector((state) => state.app);
  const router = useRouter();
  const { tableId } = router.query;
  const isOrderApp = tableId;
  const isBackofficeApp = router.pathname.includes("/backoffice");

  const socketInitiallize = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_SOCKET_API_URL}`);
  };

  useEffect(() => {
    socketInitiallize();

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
  }, []);

  if (isOrderApp) {
    return <OrderLayout>{children}</OrderLayout>;
  }

  if (isBackofficeApp) {
    return (
      <Box
        sx={{
          height: "100%",
          backgroundColor: theme === "light" ? "info.main" : "primary.light",
        }}
      >
        <BackofficeLayout>{children}</BackofficeLayout>
      </Box>
    );
  }

  return <Box>{children}</Box>;
};

export default Layout;
