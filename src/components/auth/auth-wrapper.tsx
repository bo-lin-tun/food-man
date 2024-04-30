import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import React, { memo } from "react";

const AuthWrapper = ({
  children,
  title,
  backButtonLabel,
  backButtonLink,
  backButtonText,
}: {
  children: React.ReactNode;
  title: string;
  backButtonLabel: string;
  backButtonLink: string;
  backButtonText: string;
}) => {
  return (
    <Box sx={{ height: "100vh", px: "12px" }}>
      <Box
        sx={{
          maxWidth: "600px",
          mx: "auto",
          height: "100%",
          border: "1px solid #F6F5F5",
          boxShadow: "2px 2px 10px 1px #F6F5F5",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <Box sx={{ padding: "1rem" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Box sx={{ fontSize: "1.6rem", fontWeight: "bold" }}>Logo</Box>
            <Typography sx={{ fontSize: "1.2rem" }}>{title}</Typography>
          </Box>
          <Box>{children}</Box>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: 1,
              fontSize: 14,
            }}
          >
            {backButtonLabel}{" "}
            <Link
              href={backButtonLink}
              style={{
                color: "inherit",
              }}
            >
              {backButtonText}
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(AuthWrapper);
