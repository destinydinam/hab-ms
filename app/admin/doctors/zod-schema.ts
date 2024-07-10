import { max, min } from "@/lib/utils";
import { z } from "zod";

export const AddDoctorSchema = z.object({
  firstName: z.string().min(2, min(2)).max(100, max(100)),
  lastName: z.string().min(2, min(2)).max(100, max(100)),
  otherNames: z.string().min(2, min(2)).max(100, max(100)),
  dateOfBirth: z.string().min(2, min(2)).max(100, max(100)),
  email: z.string().min(2, min(2)).max(100, max(100)),
  phoneNumber: z.string().min(2, min(2)).max(100, max(100)),
  hireDate: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  doctorType: z.string().min(2, min(2)).max(100, max(100)),
  status: z.enum(["active", "inactive"]),
});
