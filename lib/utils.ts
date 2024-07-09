import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const appName = "HAB-MS";

export const urls = {
  admin: "/admin",
  signin: "/auth/signin",
  signup: "/auth/signup",
  "reset-password": "/auth/reset-password",
};
