import { z } from "zod";

export const SignupSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "Name must be at least 2 chars" })
      .max(100, { message: "Name must be less than 100 chars" }),
    lastName: z
      .string()
      .min(2, { message: "Name must be at least 2 chars" })
      .max(100, { message: "Name must be less than 100 chars" }),
    otherNames: z
      .string()
      .min(2, { message: "Name must be at least 2 chars" })
      .max(100, { message: "Name must be less than 100 chars" })
      .optional()
      .or(z.literal("")),
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
