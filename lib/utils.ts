import { SelectDoctor } from "@/db/schema";
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

export function convertToAmPm(time: string): string {
  const [hourStr, minute] = time.split(":");
  let hour = parseInt(hourStr);

  const amPm = hour >= 12 ? "PM" : "AM";

  if (hour === 0) hour = 12;
  else if (hour > 12) hour -= 12;

  const hourFormatted = hour.toString().padStart(2, "0");
  const minuteFormatted = minute.padStart(2, "0");

  return `${hourFormatted}:${minuteFormatted} ${amPm}`;
}

export const getDoctorName = (doctor: SelectDoctor) =>
  `${doctor.title || "Dr"}. ${doctor.firstName} ${doctor.otherNames ? doctor.otherNames + " " : ""}${doctor.lastName}`;

export const getHours = (startTime: string, endTime: string) => {
  const convertToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const startMinutes = convertToMinutes(startTime);
  const endMinutes = convertToMinutes(endTime);

  let differenceInMinutes = endMinutes - startMinutes;

  if (differenceInMinutes < 0) {
    differenceInMinutes += 24 * 60;
  }

  const differenceInHours = differenceInMinutes / 60;

  return differenceInHours;
};
