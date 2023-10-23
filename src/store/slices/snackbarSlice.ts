import { SnackbarSlice } from "@/types/snackbar";
import { createSlice } from "@reduxjs/toolkit";

const initialState: SnackbarSlice = {
  message: null,
  autoHideDuration: 5000,
  open: false,
  severity: "success",
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setOpenSnackbar: (state, action) => {
      const {
        autoHideDuration = 5000,
        message,
        severity = "success",
      } = action.payload;
      state.open = true;
      state.message = message;
      state.autoHideDuration = autoHideDuration;
      state.severity = severity;
    },
    resetSnackbar: (state) => {
      state.open = false;
      state.autoHideDuration = 5000;
      state.severity = "success";
      state.message = null;
    },
  },
});

export const { setOpenSnackbar, resetSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
