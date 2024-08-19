"use server";

import {
  InsertAppointmentFormFields,
  SelectAppointmentFormFields,
  SelectAppointmentSettings,
  appointmentFormFieldsTable,
  appointmentSettingsTable,
} from "@/db/schema";
import {
  AppointmentFormFieldsSchema,
  AppointmentSettingsSchema,
} from "./zod-schema";
import { db } from "@/db";
import { and, eq } from "drizzle-orm";
import { validateRequest } from "@/auth";
import { z } from "zod";
import { generateId } from "lucia";
import { InputTypes } from "@/types/type";

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
      .set({ ...validatedFields.data, updatedAt: new Date() })
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
    console.log("getAppointmentSettings ~ error:", error);
    return { success: false, message };
  }
};

export const createAppointmentFormFields = async (
  values: z.infer<typeof AppointmentFormFieldsSchema>
) => {
  const validatedFields = AppointmentFormFieldsSchema.safeParse(values);

  if (!validatedFields.success)
    return { success: false, message: invalidInputMsg };

  try {
    const { user } = await validateRequest();

    if (!user?.id) return { success: false, message: "Unauthenticated" };

    const insertValues: InsertAppointmentFormFields = {
      id: generateId(15),
      hospitalId: user.id,

      inputName: validatedFields.data.inputName,
      inputType: validatedFields.data.inputType as InputTypes,
      required: validatedFields.data.required,
      placeholder: validatedFields.data?.placeholder || "",
      selectData: validatedFields.data.selectData,

      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.insert(appointmentFormFieldsTable).values(insertValues);

    return {
      success: true,
      message: "Appointment Form Field added Successfully",
    };
  } catch (error) {
    console.log("error:", error);
    return { success: false, message };
  }
};

export const editAppointmentFormFields = async (
  values: SelectAppointmentFormFields
) => {
  const validatedFields = AppointmentFormFieldsSchema.safeParse(values);

  if (!validatedFields.success)
    return { success: false, message: invalidInputMsg };

  try {
    await db
      .update(appointmentFormFieldsTable)
      .set({
        inputName: validatedFields.data.inputName,
        placeholder: validatedFields.data.placeholder,
        required: validatedFields.data.required,
        selectData: validatedFields.data.selectData,
        updatedAt: new Date(),
      })
      .where(eq(appointmentFormFieldsTable.id, values.id));

    return {
      success: true,
      message: "Appointment Form Field edited Successfully",
    };
  } catch (error) {
    console.log("error:", error);
    return { success: false, message };
  }
};

export const getAppointmentFormFields = async () => {
  try {
    const { user } = await validateRequest();

    if (!user?.id) return { success: false, message: "Unauthorized" };

    const appointmentFormFields = await db
      .select()
      .from(appointmentFormFieldsTable)
      .where(eq(appointmentFormFieldsTable.hospitalId, user?.id));

    return { success: true, data: appointmentFormFields };
  } catch (error) {
    console.log("getAppointmentFormFields ~ error:", error);
    return { success: false, message };
  }
};

export const deleteAppointmentFormFields = async ({
  id,
  hospitalId,
}: {
  id: string;
  hospitalId: string;
}) => {
  try {
    await db
      .delete(appointmentFormFieldsTable)
      .where(
        and(
          eq(appointmentFormFieldsTable.id, id),
          eq(appointmentFormFieldsTable.hospitalId, hospitalId)
        )
      );

    return {
      success: true,
      message: "Appointment Form Field deleted successfully",
    };
  } catch (error) {
    console.log("error:", error);
    return { success: false, message };
  }
};
