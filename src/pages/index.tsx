import { Box, Button, Typography } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <Box>
        <Typography>Not signed in</Typography>
        <Button variant="contained" onClick={() => signIn()}>
          Sign in
        </Button>
      </Box>
    );
  }
  return (
    <Box>
      <h1>Signed in with: {session.user?.email}</h1>
      <Button variant="contained" onClick={() => signOut()}>
        Sign out
      </Button>
    </Box>
  );
}
