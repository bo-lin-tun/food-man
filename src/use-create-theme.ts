import { createTheme } from "@mui/material";
import { getDesignTokens } from "./utils/theme";

export const useCreateTheme = (primaryColor: string) => {
  const theme = createTheme(getDesignTokens(primaryColor));

  return { theme };
};
