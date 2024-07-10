"use server";

import { z } from "zod";
import { AddDoctorSchema } from "./zod-schema";
import { generateId } from "lucia";
import { InsertDoctor, doctorsTable } from "@/db/schema";
import { db } from "@/db";
import { eq, or } from "drizzle-orm";
import { authUser } from "@/app/auth/actions";

const invalidInputMsg = "Invalid fields, please check your inputs";
let message = "An error occurred, Please try again later";

export const createDoctor = async (values: z.infer<typeof AddDoctorSchema>) => {
  const validatedFields = AddDoctorSchema.safeParse(values);

  if (!validatedFields.success)
    return { success: false, message: invalidInputMsg };

  try {
    const user = await authUser();

    const insertValues: InsertDoctor = {
      id: generateId(15),
      ...validatedFields.data,
      hospitalId: user.id,
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

    return { success: true, message: "Doctor added Successfully" };
  } catch (error) {
    console.log("createUser ~ error:", error);
    return { success: false, message };
  }
};
