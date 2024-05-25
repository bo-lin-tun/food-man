import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <Box
      sx={{
        height: 150,
        bgcolor: "#4C4C6D",
        px: "12px",
      }}
    >
      <Box
        sx={{
          maxWidth: 1280,
          m: "0 auto",
          display: "flex",
          height: "100%",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Box>
            <Typography sx={{ color: "#E8F6EF", fontStyle: "italic" }}>
              Hintada Street 39 <br />
              Sanchaung, Yangon <br />
              bolinnhtun6@gmail.com
              <br />
              09791563867
            </Typography>
          </Box>
         
          <Box>
            <Link
              href={"/order?=a1a4dad2-5239-44ec-99d3-ed3200f32c53"}
              style={{ textDecoration: "none" }}
            >
              <Typography sx={{ color: "#E8F6EF", fontStyle: "italic" }}>
                Order app
              </Typography>
            </Link>
            <Link href={"/backoffice"} style={{ textDecoration: "none" }}>
              <Typography sx={{ color: "#E8F6EF", fontStyle: "italic" }}>
                Backoffice
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
