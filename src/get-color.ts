import { PaletteOptions } from "@mui/material";
import chroma from "chroma-js";

// Base colors

// Generate lighter and darker shades for secondary, info, and success colors based on the primary color

// Output

export const getColor = (
  primaryColor: string,
  isDark?: boolean
): PaletteOptions => {
  const lighterSecondary = chroma(primaryColor).brighten(2).hex();
  const darkerSecondary = chroma(primaryColor).darken(2).hex();

  const lighterInfo = chroma(primaryColor).brighten().hex();
  const darkerInfo = chroma(primaryColor).darken().hex();

  const lighterSuccess = chroma(primaryColor).brighten(3).hex();
  const darkerSuccess = chroma(primaryColor).darken(3).hex();

  if (isDark)
    return {
      primary: { main: primaryColor },
      secondary: {
        main: darkerInfo,
      },
      info: {
        main: darkerSecondary,
      },
      success: {
        main: darkerSuccess,
      },
    };
  return {
    primary: { main: primaryColor },
    secondary: {
      main: lighterSecondary,
    },
    info: {
      main: lighterInfo,
    },
    success: {
      main: lighterSuccess,
    },
  };
};
