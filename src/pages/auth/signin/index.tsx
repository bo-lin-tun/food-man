import { Box, Button } from "@mui/material";
import { signIn } from "next-auth/react";

const SignIn = () => {
  return (
    <Box>
      <Button
        variant="contained"
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        Sign in
      </Button>
      <h1>Custom sign in page</h1>
    </Box>
  );
};

export default SignIn;
