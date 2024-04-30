import * as z from "zod";
import React, { useTransition } from "react";
import AuthInput from "@/components/auth/auth-input";
import AuthWrapper from "@/components/auth/auth-wrapper";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { signupSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/components/auth/error-message";
import { toast } from "react-toastify";

const Signup = () => {
  const [isPending, startTransition] = useTransition();
  const { control, handleSubmit } = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleRegister = (data: z.infer<typeof signupSchema>) => {
    startTransition(async () => {
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const resData = await response.json();
      toast.success(resData.message);
    });
  };

  return (
    <AuthWrapper
      title="Create account"
      backButtonLabel="Already have an account?"
      backButtonLink="/auth/signin"
      backButtonText="Signin"
    >
      <Box>
        <form
          onSubmit={handleSubmit(handleRegister)}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <Stack spacing={1}>
                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  Name
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
            name="company"
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <Stack spacing={1}>
                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  Company Name
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
            name="email"
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <Stack spacing={1}>
                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  Email
                </Typography>
                <AuthInput
                  placeholder="Email"
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
          <Button type="submit" variant="contained" disabled={isPending}>
            Create an account
          </Button>
        </form>
      </Box>
    </AuthWrapper>
  );
};

export default Signup;
