import { useAppDispatch } from "@/store/hooks";
import { fetchAppData } from "@/store/slices/appSlice";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import OrderAppFooter from "./OrderAppFooter";
import OrderAppHeader from "./OrderAppHeader";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const OrderLayout = (props: Props) => {
  const router = useRouter();
  const { tableId } = router.query;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (tableId) {
      dispatch(fetchAppData({ tableId: Number(tableId) }));
    }
  }, [tableId]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "info.main" }}>
      <OrderAppHeader />
      <Box sx={{ position: "relative", top: { sm: 100, md: 200 } }}>
        {props.children}
      </Box>
      <OrderAppFooter />
    </Box>
  );
};

export default OrderLayout;
