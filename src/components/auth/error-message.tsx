import { Typography } from "@mui/material";
import Box from "next-auth/providers/box";
import React, { memo } from "react";
import { FieldError } from "react-hook-form";

const ErrorMessage = ({ error }: { error: FieldError | undefined }) => {
  if (!error) return null;
  return (
    <Typography role="alert" sx={{ color: "red", fontSize: "13px" }}>
      {error.message}
    </Typography>
  );
};

export default memo(ErrorMessage);
