import * as z from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(24, { message: "Name must be 24 characters or less." }),
  company: z
    .string()
    .trim()
    .min(1, { message: "Company Name is required" })
    .max(24, { message: "Company Name must be 24 characters or less." }),
  email: z
    .string()
    .email({ message: "Email is required" })
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .trim()
    .min(1, { message: "Password is required." })
    .max(16, { message: "Password must be 16 characters or less." })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long.",
      }
    ),
});

export const signinSchema = z.object({
  email: z
    .string()
    .email({ message: "Email is required" })
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .trim()
    .min(1, { message: "Password is required." })
    .max(16, { message: "Password must be 16 characters or less." })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long.",
      }
    ),
});
