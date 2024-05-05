import { getColor } from "@/get-color";
import { store } from "@/store";
import { useCreateTheme } from "@/use-create-theme";
import { createTheme } from "@mui/material/styles";

export const getDesignTokens = (primaryColor: string) => {
  const state = store.getState();
  const theme = state.app.theme;

  if (theme === "light") {
    return {
      palette: getColor(primaryColor || "#000000"),
    };
  } else {
    return {
      palette: getColor(primaryColor || "#000000", true),
    };
  }
};
