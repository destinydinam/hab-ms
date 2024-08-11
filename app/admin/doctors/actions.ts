"use server";

import { z } from "zod";
import {
  AddDoctorSchema,
  AddOverrideSchema,
  EditAvailabilitySchema,
} from "./zod-schema";
import { generateId } from "lucia";
import {
  InsertDoctor,
  InsertOverride,
  InsertWeeklyAvailabilities,
  SelectDoctor,
  doctorsTable,
  overridesTable,
  weeklyAvailabilitiesTable,
} from "@/db/schema";
import { db } from "@/db";
import { eq, or } from "drizzle-orm";
import { authUser } from "@/app/auth/actions";
import { validateRequest } from "@/auth";
import { revalidatePath } from "next/cache";
import { days, urls } from "@/lib/utils";

const invalidInputMsg = "Invalid fields, please check your inputs";
let message = "An error occurred, Please try again later";

export const createDoctor = async (values: z.infer<typeof AddDoctorSchema>) => {
  const validatedFields = AddDoctorSchema.safeParse(values);

  if (!validatedFields.success)
    return { success: false, message: invalidInputMsg };

  try {
    const { user } = await validateRequest();

    const userData = await authUser(user?.id!);

    const insertValues: InsertDoctor = {
      id: generateId(15),
      ...validatedFields.data,
      hospitalId: userData.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const [existingUser] = await db
      .select()
      .from(doctorsTable)
      .where(
        or(
          eq(doctorsTable.email, validatedFields.data.email),
          eq(doctorsTable.phoneNumber, validatedFields.data.phoneNumber)
        )
      );

    if (existingUser)
      return {
        success: false,
        message: "A Doctor already exists with this email or phone number",
      };

    await db.insert(doctorsTable).values(insertValues);

    const weeklyAvailabilitiesInsertValues: InsertWeeklyAvailabilities[] =
      days.map((day) => ({
        id: generateId(15),
        doctorId: insertValues.id,
        day,
        startTime: insertValues.startTime,
        endTime: insertValues.endTime,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

    await db
      .insert(weeklyAvailabilitiesTable)
      .values(weeklyAvailabilitiesInsertValues);

    revalidatePath(urls.admin.doctors);

    return { success: true, message: "Doctor added Successfully" };
  } catch (error) {
    console.log("createUser ~ error:", error);
    return { success: false, message };
  }
};

type EditDoctorValues = {
  doctor: SelectDoctor;
  values: z.infer<typeof AddDoctorSchema>;
};

export const editDoctor = async ({ doctor, values }: EditDoctorValues) => {
  const validatedFields = AddDoctorSchema.safeParse(values);

  if (!validatedFields.success)
    return { success: false, message: invalidInputMsg };

  try {
    const insertValues: InsertDoctor = {
      ...doctor,
      ...values,
      updatedAt: new Date(),
    };

    await db
      .update(doctorsTable)
      .set(insertValues)
      .where(eq(doctorsTable.id, doctor.id));

    revalidatePath(urls.admin.doctors + "/" + doctor.id);

    return { success: true, message: "Doctor edited Successfully" };
  } catch (error) {
    console.log("editDoctor ~ error:", error);
    return { success: false, message };
  }
};

export const getWeeklyAvailabilities = async (doctorId: string) => {
  try {
    const weeklyAvailabilities = await db
      .select()
      .from(weeklyAvailabilitiesTable)
      .where(eq(weeklyAvailabilitiesTable.doctorId, doctorId));

    return { success: true, data: weeklyAvailabilities };
  } catch (error) {
    console.log("getWeeklyAvailabilities ~ error:", error);
    return { success: false, message };
  }
};

export const editWeeklyAvailability = async (
  values: z.infer<typeof EditAvailabilitySchema>
) => {
  const validatedFields = EditAvailabilitySchema.safeParse(values);

  if (!validatedFields.success)
    return { success: false, message: invalidInputMsg };

  try {
    await db
      .update(weeklyAvailabilitiesTable)
      .set(validatedFields.data)
      .where(eq(weeklyAvailabilitiesTable.id, validatedFields.data.id));

    return { success: true, message: "Availability edited Successfully" };
  } catch (error) {
    console.log("error:", error);
    return { success: false, message };
  }
};

export const deleteWeeklyAvailability = async (doctorId: string) => {
  try {
    await db
      .delete(weeklyAvailabilitiesTable)
      .where(eq(weeklyAvailabilitiesTable.doctorId, doctorId));

    return { success: true, message: "Availability deleted successfully" };
  } catch (error) {
    console.log("deleteWeeklyAvailability ~ error:", error);
    return { success: false, message };
  }
};

export const createOverride = async (
  values: z.infer<typeof AddOverrideSchema>
) => {
  const validatedFields = AddOverrideSchema.safeParse(values);

  if (!validatedFields.success)
    return { success: false, message: invalidInputMsg };

  try {
    const insertValues: InsertOverride = {
      id: generateId(15),
      ...validatedFields.data,

      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // do a check to make sure there are no overlapping overrides

    await db.insert(overridesTable).values(insertValues);

    return { success: true, message: "Override added Successfully" };
  } catch (error) {
    console.log("createUser ~ error:", error);
    return { success: false, message };
  }
};

export const getOverrides = async (doctorId: string) => {
  try {
    const overrides = await db
      .select()
      .from(overridesTable)
      .where(eq(overridesTable.doctorId, doctorId));

    return { success: true, data: overrides };
  } catch (error) {
    console.log("getOverrides ~ error:", error);
    return { success: false, message };
  }
};
