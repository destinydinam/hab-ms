import { z } from "zod";

export const SignupSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: "Must be at least 2 chars" })
      .max(100, { message: "Must be less than 100 chars" }),
    hospitalName: z
      .string()
      .min(3, { message: "Must be at least 3 chars" })
      .max(100, { message: "Must be less than 100 chars" }),
    address: z
      .string()
      .min(3, { message: "Must be at least 3 chars" })
      .max(100, { message: "Must be less than 100 chars" }),
    phoneNumber: z.string(),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 chars" })
      .max(40, { message: "Password must be less than 40 chars" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 chars" })
      .max(40, { message: "Password must be less than 40 chars" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const ResetNewPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 chars" })
      .max(40, { message: "Password must be less than 40 chars" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 chars" })
      .max(40, { message: "Password must be less than 40 chars" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const SigninSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 chars" })
    .max(40, { message: "Password must be less than 40 chars" }),
});

export const ResetPasswordSchema = z.object({
  email: z.string().email(),
});
