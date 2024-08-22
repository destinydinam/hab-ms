import { SelectDoctor } from "@/db/schema";
import { Days, InputTypes, ScheduleStatus } from "@/types/type";
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
  admin: {
    doctors: "/admin/doctors",
    schedules: "/admin/schedules",
    account: "/admin/account",
  },
  public: { "schedule-appointment": "/public/schedule-appointment" },
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

export const days: Days[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const queryKeys = {
  doctors: "doctors",
  overrides: "overrides",
  "work-experience": "work-experience",
  certifications: "certifications",
  "weekly-availabilities": "weekly-availabilities",
  appointments: "appointments",
  "appointments-settings": "appointments-settings",
  "appointment-form-fields": "appointment-form-fields",
};

export const durations = [
  { value: 1, label: "1 minutes" },
  { value: 2, label: "2 minutes" },
  { value: 3, label: "3 minutes" },
  { value: 5, label: "5 minutes" },
  { value: 10, label: "10 minutes" },
  { value: 15, label: "15 minutes" },
  { value: 20, label: "20 minutes" },
  { value: 25, label: "25 minutes" },
  { value: 30, label: "30 minutes" },
];

export const noYes = ["no", "yes"];

export const inputTypes: InputTypes[] = [
  "text",
  "email",
  "textarea",
  "phoneNumber",
  "select",
  "date",
  "time",
];

export const scheduleStatuses: {
  label: string;
  value: ScheduleStatus;
  color?: string;
}[] = [
  { label: "All", value: "all" },
  { label: "Booked", value: "booked", color: "#FFD700" },
  { label: "Available", value: "available", color: "#1AAA55" },
  { label: "Cancelled", value: "cancelled", color: "#FF5E5E" },
];

export const checkOverlap = ({
  overrideStart,
  overrideEnd,
  newStart,
  newEnd,
}: {
  overrideStart: Date;
  overrideEnd: Date;
  newStart: Date;
  newEnd: Date;
}): { success: boolean; message: string } => {
  if (
    (newStart.toISOString() >= overrideStart.toISOString() &&
      newStart.toISOString() < overrideEnd.toISOString()) || // check if the new start date is within the override period
    (newEnd.toISOString() > overrideStart.toISOString() &&
      newEnd.toISOString() <= overrideEnd.toISOString()) || // check if the new end date is within the override period
    (newStart.toISOString() <= overrideStart.toISOString() &&
      newEnd.toISOString() > overrideEnd.toISOString()) || // check if the new period entirely contains the override period
    newStart.toISOString() === overrideEnd.toISOString() // checks if the new start date is exactly equal to the override end date.
  ) {
    return {
      success: false,
      message: `There is an overlap with the 
      override with the following details: 
      Start Date:${overrideStart} - End Date: ${overrideEnd}`,
    };
  } else {
    return { success: true, message: "No overlap" };
  }
};

export const addMinutes = (time: string, minutes: number) => {
  const [hours, mins] = time.split(":").map(Number);
  const totalMinutes = hours * 60 + mins + minutes;
  const newHours = Math.floor(totalMinutes / 60);
  const newMins = totalMinutes % 60;

  return `${padZero(newHours)}:${padZero(newMins)}`;
};

function padZero(num: number) {
  return (num < 10 ? "0" : "") + num;
}

export const calculateDurations = ({
  startTime,
  endTime,
  duration,
  bufferTime,
}: {
  startTime: string;
  endTime: string;
  duration: number;
  bufferTime: number;
}) => {
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  let currentMinutes = startMinutes;
  let numDurations = 0;

  while (currentMinutes + duration + bufferTime <= endMinutes) {
    currentMinutes += duration;
    numDurations++;
    currentMinutes += bufferTime;
  }

  if (currentMinutes + duration <= endMinutes) {
    numDurations++;
  }

  return numDurations;
};

function timeToMinutes(time: string) {
  const [hours, mins] = time.split(":").map(Number);
  return hours * 60 + mins;
}

export const defaultFormFields = [
  {
    inputName: "Full Name",
    inputType: "text" as InputTypes,
    required: "yes",
    placeholder: "",
  },
  {
    inputName: "Email",
    inputType: "email" as InputTypes,
    required: "yes",
    placeholder: "",
  },
  {
    inputName: "Phone Number",
    inputType: "phoneNumber" as InputTypes,
    required: "yes",
    placeholder: "",
  },
  {
    inputName: "Appointment Note",
    inputType: "textarea" as InputTypes,
    required: "no",
    placeholder: "",
  },
];
