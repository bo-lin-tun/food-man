import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Alert, Snackbar as MuiSnackBar } from "@mui/material";

const Snackbar = () => {
  const { open, severity, message } = useAppSelector((state) => state.snackbar);
  const dispatch = useAppDispatch();
  return (
    <MuiSnackBar open={open} autoHideDuration={2000}>
      <Alert severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </MuiSnackBar>
  );
};

export default Snackbar;
