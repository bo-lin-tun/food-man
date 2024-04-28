import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import { Box } from "@mui/material";
import Image from "next/image";
const FoodiePOS = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        overflowY: "auto",
        flexDirection: "column",
      }}
    >
      <Header />
      <Box
        sx={{
          maxWidth: { md: "100%", lg: "1280px" },
          m: "0 auto",
          px: { xs: "10px", md: "15px" },
        }}
      >
 {/* start */}
        <Image
          src="/QRcode.jpeg"
          width={500}
          height={500}
          alt="Picture of the author"
          style={{ marginLeft: -40, borderRadius: 5 }}
        />
        <Hero />
        <Features />
       

        <Testimonials />
      </Box>
      <Footer />
    </Box>
  );
};

export default FoodiePOS;
