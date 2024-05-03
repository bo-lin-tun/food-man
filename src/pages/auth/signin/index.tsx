import * as z from "zod";
import React from "react";
import AuthInput from "@/components/auth/auth-input";
import AuthWrapper from "@/components/auth/auth-wrapper";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { signinSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/components/auth/error-message";

const Signin = () => {
  const { control, handleSubmit } = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignin = async (data: z.infer<typeof signinSchema>) => {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: "/backoffice",
    });
  };

  return (
    <AuthWrapper
      title="Welcome back!"
      backButtonLabel="Don't have an account?"
      backButtonLink="/auth/signup"
      backButtonText="Create one"
    >
      <Box>
        <form
          onSubmit={handleSubmit(handleSignin)}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <Stack spacing={1}>
                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  Email
                </Typography>
                <AuthInput
                  placeholder="Name"
                  onChange={({ target: { value } }) => {
                    onChange(value);
                  }}
                />
                <ErrorMessage error={error} />
              </Stack>
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <Stack spacing={1}>
                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  Password
                </Typography>
                <AuthInput
                  placeholder="Password"
                  type="password"
                  onChange={({ target: { value } }) => {
                    onChange(value);
                  }}
                />
                <ErrorMessage error={error} />
              </Stack>
            )}
          />
          <Button type="submit" variant="contained">
            Sign In
          </Button>
        </form>
      </Box>
    </AuthWrapper>
  );
};

export default Signin;
