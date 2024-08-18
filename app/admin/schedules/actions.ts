"use server";

import {
  SelectAppointmentSettings,
  appointmentSettingsTable,
} from "@/db/schema";
import { AppointmentSettingsSchema } from "./zod-schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { validateRequest } from "@/auth";

const invalidInputMsg = "Invalid fields, please check your inputs";
let message = "An error occurred, Please try again later";

export const editAppointmentSettings = async (
  values: SelectAppointmentSettings
) => {
  const validatedFields = AppointmentSettingsSchema.safeParse(values);

  if (!validatedFields.success)
    return { success: false, message: invalidInputMsg };

  try {
    await db
      .update(appointmentSettingsTable)
      .set(validatedFields.data)
      .where(eq(appointmentSettingsTable.id, values.id));

    return {
      success: true,
      message: "Appointment Settings edited Successfully",
    };
  } catch (error) {
    console.log("error:", error);
    return { success: false, message };
  }
};

export const getAppointmentSettings = async () => {
  try {
    const { user } = await validateRequest();

    if (!user?.id) return { success: false, message: "Unauthorized" };

    const [appointmentSettings] = await db
      .select()
      .from(appointmentSettingsTable)
      .where(eq(appointmentSettingsTable.hospitalId, user?.id!));

    return { success: true, data: appointmentSettings };
  } catch (error) {
    console.log("getWorkExperience ~ error:", error);
    return { success: false, message };
  }
};
