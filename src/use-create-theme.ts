import { createTheme } from "@mui/material";
import { getDesignTokens } from "./utils/theme";
import { useEffect, useState } from "react";
import { useAppSelector } from "./store/hooks";

export const useCreateTheme = (primaryColor: string) => {
  const theme = createTheme(getDesignTokens(primaryColor));
  return { theme };
};
