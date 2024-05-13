import { Box, Button, Slide, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

const Hero = () => {
  const router = useRouter();
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
            Manage your menu catelog easily with Foodie POS and entice your
            customers with QR code ordering system.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Link
              href={`/order?tableId=${"971cd91e-b48f-454a-8cf2-7976a5f2ca9e"}`}
            >
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
            <Link href={`/backoffice/orders`}>
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
