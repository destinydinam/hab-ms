import { max, min } from "@/lib/utils";
import { z } from "zod";

export const AddDoctorSchema = z.object({
  title: z.string(),
  firstName: z.string().min(2, min(2)).max(100, max(100)),
  lastName: z.string().min(2, min(2)).max(100, max(100)),
  otherNames: z
    .string()
    .min(2, min(2))
    .max(100, max(100))
    .optional()
    .or(z.literal("")),
  dateOfBirth: z.string().min(2, min(2)).max(100, max(100)),
  email: z.string().min(2, min(2)).max(100, max(100)),
  phoneNumber: z.string().min(2, min(2)).max(100, max(100)),
  hireDate: z.string(),
  startDate: z.string(),
  endDate: z.string().optional().or(z.literal("")),
  startTime: z.string(),
  endTime: z.string(),
  doctorType: z.string().min(2, min(2)).max(100, max(100)),
  status: z.enum(["active", "inactive"]),
});

export const EditAvailabilitySchema = z.object({
  id: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});

export const AddOverrideSchema = z.object({
  doctorId: z.string().min(1, { message: "DoctorId Required" }),
  startDate: z.string().min(1, { message: "Start Date Required" }),
  startTime: z.string().min(1, { message: "Start Time Required" }),
  endDate: z.string().min(1, { message: "End Date Required" }),
  endTime: z.string().min(1, { message: "End Time Required" }),
  reason: z.string().optional().or(z.literal("")),
});

export const AddCertificationSchema = z.object({
  doctorId: z.string().min(1, { message: "DoctorId Required" }),
  certificationName: z
    .string()
    .min(1, { message: "Certification Name Required" }),
  dateIssued: z.string().min(1, { message: "Date Issued Required" }),
  expiryDate: z.string().optional().or(z.literal("")),
  certificateFile: z.string().optional().or(z.literal("")),
});

export const AddWorkExperienceSchema = z.object({
  doctorId: z.string().min(1, { message: "DoctorId Required" }),
  companyName: z.string().min(1, { message: "Company Name Required" }),
  jobTitle: z.string().min(1, { message: "Job Title Required" }),
  startDate: z.string().optional().or(z.literal("")),
  endDate: z.string().optional().or(z.literal("")),
});
