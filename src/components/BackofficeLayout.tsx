import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAppData } from "@/store/slices/appSlice";
import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import SideBar from "./Sidebar";
import Topbar from "./Topbar";
import { Order, Table } from "@prisma/client";
import { addOrders } from "@/store/slices/orderSlice";
import { toast } from "react-toastify";
import { socket } from "@/utils/socket";

interface Props {
  children: ReactNode;
}

const BackofficeLayout = ({ children }: Props) => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const { isReady, ...router } = useRouter();
  const { theme } = useAppSelector((state) => state.app);
  const { init } = useAppSelector((state) => state.app);

  useEffect(() => {
    if (session && !init) {
      dispatch(fetchAppData({}));
    }
    if (isReady && !session) {
      router.push("/backoffice/orders");
    }
  }, [session, isReady]);

  useEffect(() => {
    socket.on(
      "new_order",
      ({ orders, table }: { orders: Order[]; table: Table }) => {
        dispatch(addOrders(orders));
        toast.success(`New order from ${table.name}`);
      }
    );

    return () => {
      socket.off("new_order");
    };
  }, []);

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Topbar />
      <Box sx={{ display: "flex", position: "relative", zIndex: 5, flex: 1 }}>
        {session && (
          <Box
            sx={{ minHeight: "100vh", display: { xs: "none", sm: "block" } }}
          >
            <SideBar />
          </Box>
        )}
        <Box
          sx={{
            p: 3,
            width: "100%",
            minHeight: "100%",
            backgroundColor: theme === "light" ? "info.main" : "primary.light",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default BackofficeLayout;
