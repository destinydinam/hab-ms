import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const appName = "HAB-MS";

export const urls = {
  signin: "/auth/signin",
  signup: "/auth/signup",
  "reset-password": "/auth/reset-password",
  admin: { doctors: "/admin/doctors", schedules: "/admin/schedules" },
};

export const min = (length: number) => ({
  message: `Must be at least ${length} chars`,
});

export const max = (length: number) => ({
  message: `Must be less than ${length} chars`,
});
