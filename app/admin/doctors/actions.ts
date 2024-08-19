"use server";

import { z } from "zod";
import {
  AddCertificationSchema,
  AddDoctorSchema,
  AddOverrideSchema,
  AddWorkExperienceSchema,
  EditAvailabilitySchema,
} from "./zod-schema";
import { generateId } from "lucia";
import {
  InsertCertification,
  InsertDoctor,
  InsertOverride,
  InsertWeeklyAvailabilities,
  InsertWorkExperience,
  SelectCertification,
  SelectDoctor,
  SelectWorkExperience,
  certificationsTable,
  doctorsTable,
  overridesTable,
  weeklyAvailabilitiesTable,
  workExperienceTable,
} from "@/db/schema";
import { db } from "@/db";
import { and, eq, or } from "drizzle-orm";
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

// =======================  Weekly Availabilities =======================

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

// ======================= Override =======================

export const createOverride = async (
  values: z.infer<typeof AddOverrideSchema>
) => {
  const validatedFields = AddOverrideSchema.safeParse(values);

  if (!validatedFields.success)
    return { success: false, message: invalidInputMsg };

  try {
    const { user } = await validateRequest();

    if (!user?.id) return { success: false, message: "Unauthenticated" };

    const insertValues: InsertOverride = {
      id: generateId(15),
      ...validatedFields.data,
      hospitalId: user.id,
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

export const deleteOverride = async ({
  id,
  doctorId,
}: {
  id: string;
  doctorId: string;
}) => {
  try {
    await db
      .delete(overridesTable)
      .where(
        and(eq(overridesTable.id, id), eq(overridesTable.doctorId, doctorId))
      );

    return { success: true, message: "Override deleted successfully" };
  } catch (error) {
    console.log("error:", error);
    return { success: false, message };
  }
};

// ======================= Certification =======================

export const createCertification = async (
  values: z.infer<typeof AddCertificationSchema>
) => {
  const validatedFields = AddCertificationSchema.safeParse(values);

  if (!validatedFields.success)
    return { success: false, message: invalidInputMsg };

  try {
    const { user } = await validateRequest();

    if (!user?.id) return { success: false, message: "Unauthenticated" };

    const insertValues: InsertCertification = {
      id: generateId(15),
      hospitalId: user.id,
      certificateFile: "",
      certificationName: validatedFields.data.certificationName,
      dateIssued: validatedFields.data.dateIssued,
      doctorId: validatedFields.data.doctorId,
      expiryDate: validatedFields.data.expiryDate,

      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.insert(certificationsTable).values(insertValues);

    return { success: true, message: "Certification added Successfully" };
  } catch (error) {
    console.log("error:", error);
    return { success: false, message };
  }
};

export const editCertification = async (values: SelectCertification) => {
  const validatedFields = AddCertificationSchema.safeParse(values);

  if (!validatedFields.success)
    return { success: false, message: invalidInputMsg };

  try {
    await db
      .update(certificationsTable)
      .set({ ...validatedFields.data, updatedAt: new Date() })
      .where(eq(certificationsTable.id, values.id));

    return { success: true, message: "Certification edited Successfully" };
  } catch (error) {
    console.log("error:", error);
    return { success: false, message };
  }
};

export const getCertifications = async (doctorId: string) => {
  try {
    const certifications = await db
      .select()
      .from(certificationsTable)
      .where(eq(certificationsTable.doctorId, doctorId));

    return { success: true, data: certifications };
  } catch (error) {
    console.log("getCertifications ~ error:", error);
    return { success: false, message };
  }
};

export const deleteCertification = async ({
  id,
  doctorId,
}: {
  id: string;
  doctorId: string;
}) => {
  try {
    await db
      .delete(certificationsTable)
      .where(
        and(
          eq(certificationsTable.id, id),
          eq(certificationsTable.doctorId, doctorId)
        )
      );

    return { success: true, message: "Certification deleted successfully" };
  } catch (error) {
    console.log("error:", error);
    return { success: false, message };
  }
};

// ======================= Work Experience =======================

export const createWorkExperience = async (
  values: z.infer<typeof AddWorkExperienceSchema>
) => {
  const validatedFields = AddWorkExperienceSchema.safeParse(values);

  if (!validatedFields.success)
    return { success: false, message: invalidInputMsg };

  try {
    const { user } = await validateRequest();

    if (!user?.id) return { success: false, message: "Unauthenticated" };

    const insertValues: InsertWorkExperience = {
      id: generateId(15),
      doctorId: validatedFields.data.doctorId,
      hospitalId: user.id,

      companyName: validatedFields.data.companyName,
      jobTitle: validatedFields.data.jobTitle,
      startDate: validatedFields.data.startDate,
      endDate: validatedFields.data.endDate,

      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.insert(workExperienceTable).values(insertValues);

    return { success: true, message: "Work Experience added Successfully" };
  } catch (error) {
    console.log("error:", error);
    return { success: false, message };
  }
};

export const editWorkExperience = async (values: SelectWorkExperience) => {
  const validatedFields = AddWorkExperienceSchema.safeParse(values);

  if (!validatedFields.success)
    return { success: false, message: invalidInputMsg };

  try {
    await db
      .update(workExperienceTable)
      .set({ ...validatedFields.data, updatedAt: new Date() })
      .where(eq(workExperienceTable.id, values.id));

    return { success: true, message: "Work Experience edited Successfully" };
  } catch (error) {
    console.log("error:", error);
    return { success: false, message };
  }
};

export const getWorkExperience = async (doctorId: string) => {
  try {
    const workExperiences = await db
      .select()
      .from(workExperienceTable)
      .where(eq(workExperienceTable.doctorId, doctorId));

    return { success: true, data: workExperiences };
  } catch (error) {
    console.log("getWorkExperience ~ error:", error);
    return { success: false, message };
  }
};

export const deleteWorkExperience = async ({
  id,
  doctorId,
}: {
  id: string;
  doctorId: string;
}) => {
  try {
    await db
      .delete(workExperienceTable)
      .where(
        and(
          eq(workExperienceTable.id, id),
          eq(workExperienceTable.doctorId, doctorId)
        )
      );

    return { success: true, message: "Work Experience deleted successfully" };
  } catch (error) {
    console.log("error:", error);
    return { success: false, message };
  }
};
