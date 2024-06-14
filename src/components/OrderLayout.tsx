import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAppData } from "@/store/slices/appSlice";
import { Box, CircularProgress, ThemeProvider } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import OrderAppFooter from "./OrderAppFooter";
import OrderAppHeader from "./OrderAppHeader";
import { config } from "@/utils/config";
import { useCreateTheme } from "@/use-create-theme";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const OrderLayout = (props: Props) => {
  const { isLoading } = useAppSelector((state) => state.app);
  const [mainTheme, setMainTheme] = useState("#000000");
  const router = useRouter();
  const { tableId } = router.query;
  const dispatch = useAppDispatch();
  console.log({ mainTheme });
  const { theme: themeValue } = useCreateTheme(mainTheme);

  const fetchTable = async () => {
    if (!tableId) return;
    console.log("fetch data");
    fetch(`${config.orderApiUrl}/theme?tableId=${tableId}`)
      .then((res) => res.json())
      .then((data) => {
        const { theme } = data as { theme: string | null };
        if (theme) {
         setMainTheme(`#${theme? theme : '000000'}`);
        }
      })
      .catch((err) => console.log({ err }));
    dispatch(fetchAppData({ tableId: tableId as string }));
  };

  useEffect(() => {
    fetchTable();
  }, []);

  return (
    <ThemeProvider theme={themeValue}>
      {" "}
      <Box
        sx={{
          minHeight: "100vh",
          height: "auto",
          bgcolor: "info.main",
          pb: { xs: 10, md: 0 },
        }}
      >
        <OrderAppHeader />
        <Box>
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
    </ThemeProvider>
  );
};

export default OrderLayout;
