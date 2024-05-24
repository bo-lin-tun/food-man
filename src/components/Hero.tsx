import { config } from "@/utils/config";
import { Box, Button, Slide, Typography } from "@mui/material";
import { Table } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Hero = () => {
  const router = useRouter();
  const [tableId, setTableId] = useState(
    "3447d17c-6124-409d-8cf2-259c51961145"
  );

  const fetchTableId = async () => {
    const response = await fetch(`${config.orderApiUrl}/get-table-id`);

    if (response.ok) {
      const table = (await response.json()) as Table | null;

      if (table) {
        setTableId(table.id);
      }
    }
  };

  useEffect(() => {
    fetchTableId();
  }, []);

  return (
    <Box
      sx={{
        mt: "px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Slide
        direction="down"
        in={true}
        mountOnEnter
        unmountOnExit
        timeout={1000}
      >
        <Box>
          <Typography
            sx={{
              maxWidth: 700,
              mb: 4,
              fontSize: { xs: "16px", md: "25px" },
            }}
          >
            Manage your menu catalog easily with Food Man and entice your
            customers with a QR code ordering system.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Link href={`/order?tableId=${tableId}`} passHref>
              <Button
                variant="contained"
                sx={{
                  fontSize: { xs: "16px", md: "20px" },
                  mr: 2,
                  width: "fit-content",
                  backgroundColor: "#41B06E",
                }}
              >
                Order App
              </Button>
            </Link>
            <Link href={`/backoffice/orders`} passHref>
              <Button
                variant="contained"
                sx={{
                  fontSize: { xs: "16px", md: "20px" },
                  width: "fit-content",
                  backgroundColor: "#4C4C6D",
                }}
              >
                Backoffice App
              </Button>
            </Link>
          </Box>
        </Box>
      </Slide>
    </Box>
  );
};

export default Hero;
