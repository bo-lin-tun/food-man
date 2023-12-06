import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAppData } from "@/store/slices/appSlice";
import { Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import OrderAppFooter from "./OrderAppFooter";
import OrderAppHeader from "./OrderAppHeader";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const OrderLayout = (props: Props) => {
  const { isLoading } = useAppSelector((state) => state.app);
  const router = useRouter();
  const { tableId } = router.query;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (tableId) {
      dispatch(fetchAppData({ tableId: Number(tableId) }));
    }
  }, [tableId]);

  return (
    <Box sx={{ height: "100vh", bgcolor: "info.main" }}>
      <Box sx={{ height: { xs: "8%", sm: "10%" } }}>
        <OrderAppHeader />
      </Box>
      <Box
        sx={{
          minHeight: { xs: "90%", sm: "85%" },
          position: "relative",
          top: { sm: 10, md: 40, lg: 70 },
          bgcolor: "info.main",
        }}
      >
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
              top: 200,
            }}
          >
            <CircularProgress size={80} />
          </Box>
        ) : (
          props.children
        )}
      </Box>
      <OrderAppFooter />
    </Box>
  );
};

export default OrderLayout;
