import { z } from "zod";

export const AppointmentSettingsSchema = z.object({
  duration: z.string().min(1, { message: "Duration Required" }),
  bufferTime: z.string().min(1, { message: "Buffer Time Required" }),
  paymentBeforeBooking: z.string().min(1, { message: "Required" }),
  showDoctorName: z.string().min(1, { message: "Required" }),
});
