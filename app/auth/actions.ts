"use server";

import { z } from "zod";
import {
  ResetNewPasswordSchema,
  ResetPasswordSchema,
  SigninSchema,
  SignupSchema,
} from "../zodSchema";
import { db } from "@/db";
import {
  InsertAppointmentSettings,
  InsertUser,
  appointmentFormFieldsTable,
  appointmentSettingsTable,
  passwordResetTokensTable,
  sessionTable,
  usersTable,
} from "@/db/schema";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { lucia, validateRequest } from "@/auth";
import { Argon2id } from "oslo/password";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { LibsqlError } from "@libsql/client";
import { TimeSpan, createDate, isWithinExpirationDate } from "oslo";
import ResetPasswordTemplate from "@/components/emails/reset-password-template";
import { Resend } from "resend";
import { urls } from "@/lib/utils";
import { InputTypes } from "@/types/type";

const invalidInputMsg = "Invalid fields, please check your inputs";
let message = "An error occurred, Please try again later";

export const signUp = async (values: z.infer<typeof SignupSchema>) => {
  const validatedFields = SignupSchema.safeParse(values);

  if (!validatedFields.success)
    return { success: false, message: invalidInputMsg };

  try {
    const hashedPassword = await new Argon2id().hash(values.password);
    const userId = generateId(15);

    const insertValues: InsertUser = {
      id: userId,
      username: values.username,
      hospitalName: values.hospitalName,
      address: values.address,
      phoneNumber: values.phoneNumber,
      email: values.email,
      createdAt: new Date(),
      updatedAt: new Date(),
      hashedPassword: hashedPassword,
    };

    const [existingUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, validatedFields.data.email));

    if (existingUser)
      return {
        success: false,
        message: "An account already exists with this email",
      };

    await db.insert(usersTable).values(insertValues);

    const appointmentSettings: InsertAppointmentSettings = {
      id: generateId(15),
      hospitalId: insertValues.id,
      duration: process.env.DEFAULT_DURATION || "5",
      bufferTime: process.env.DEFAULT_BUFFER_TIME || "2",
      paymentBeforeBooking: "yes",
      showDoctorName: "no",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.insert(appointmentSettingsTable).values(appointmentSettings);

    await db.insert(appointmentFormFieldsTable).values(
      defaultFormFields.map((f) => ({
        id: generateId(15),
        hospitalId: insertValues.id,
        ...f,
        updatedAt: new Date(),
        createdAt: new Date(),
      }))
    );

    const session = await lucia.createSession(insertValues.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return { success: true, message: "Account Created Successfully" };
  } catch (error) {
    console.log("createUser ~ error:", error);

    if (error instanceof LibsqlError) {
      message =
        error.message ===
        "SQLITE_CONSTRAINT: SQLite error: UNIQUE constraint failed: users.email"
          ? "An account already exsits with the same email"
          : message;
    }

    return { success: false, message };
  }
};

export const signIn = async (values: z.infer<typeof SigninSchema>) => {
  const validatedFields = SigninSchema.safeParse(values);

  if (!validatedFields.success)
    return { success: false, message: invalidInputMsg };

  try {
    const [existingUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, values.email));

    if (!existingUser) {
      return { success: false, message: "Incorrect email or password" };
    }

    const validPassword = await new Argon2id().verify(
      existingUser.hashedPassword,
      values.password
    );

    if (!validPassword)
      return { success: false, message: "Incorrect password" };

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return { success: true, message: "Welcome " + existingUser.username };
  } catch (error) {
    return { success: false, message };
  }
};

export const signOut = async () => {
  const { session } = await validateRequest();

  if (!session) {
    return { error: "Unauthorized" };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  redirect(urls.signin);
};

export const sendPasswordResetLink = async (
  values: z.infer<typeof ResetPasswordSchema>
) => {
  const validatedFields = ResetPasswordSchema.safeParse(values);

  if (!validatedFields.success)
    return { success: false, message: invalidInputMsg };

  const { user } = await validateRequest();

  try {
    const [existingUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, validatedFields.data.email));

    if (!existingUser)
      return {
        success: false,
        message: "There is no account with this email.",
      };

    const verificationToken = await generatePasswordResetToken(
      existingUser?.id!
    );

    const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password/${verificationToken}`;

    const resp = await sendMail({
      user_email: validatedFields.data.email,
      pass_reset_link: verificationLink,
    });

    return resp;
  } catch (error) {
    return { success: false, message: "Failed to send verification email." };
  }
};

async function generatePasswordResetToken(userId: string): Promise<string> {
  await db
    .delete(passwordResetTokensTable)
    .where(eq(passwordResetTokensTable.userId, userId));
  const tokenId = generateId(40);
  await db.insert(passwordResetTokensTable).values({
    id: tokenId,
    userId,
    expiresAt: createDate(new TimeSpan(2, "h")),
  });
  return tokenId;
}

const SENDER_EMAIL = process.env.RESEND_SENDER_EMAIL!;

const resend = new Resend(process.env.RESEND_API_KEY!);

const sendMail = async ({
  user_email,
  pass_reset_link,
}: {
  user_email: string;
  pass_reset_link: string;
}) => {
  try {
    const { data, error } = await resend.emails.send({
      from: `HAB-MS <${SENDER_EMAIL}>`,
      to: [user_email],
      subject: "Password reset request",
      react: ResetPasswordTemplate({ user_email, pass_reset_link }),
    });

    if (!error)
      return { success: true, message: "Email Sent, Please check your mail." };
    else
      return { success: false, message: "Failed to send verification email." };
  } catch (error) {
    console.log("error:", error);
    return { success: false, message: "Failed to send verification email." };
  }
};

interface NewResetPasswordValues
  extends z.infer<typeof ResetNewPasswordSchema> {
  token: string;
}

export const resetPassword = async (values: NewResetPasswordValues) => {
  const validatedFields = ResetNewPasswordSchema.safeParse(values);

  if (!validatedFields.success)
    return { success: false, message: invalidInputMsg };

  try {
    const [item] = await db
      .select()
      .from(passwordResetTokensTable)
      .where(eq(passwordResetTokensTable.id, values.token));

    if (!item)
      return { success: false, message: "Invalid password reset link" };

    await db
      .delete(passwordResetTokensTable)
      .where(eq(passwordResetTokensTable.id, item.id));

    await db.delete(sessionTable).where(eq(sessionTable.userId, item.userId));

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, item.userId));

    if (!isWithinExpirationDate(item.expiresAt))
      return { success: false, message: "Password reset link expired." };

    await lucia.invalidateUserSessions(item.userId);
    const hashedPassword = await new Argon2id().hash(
      validatedFields.data.password
    );

    await db
      .update(usersTable)
      .set({ hashedPassword })
      .where(eq(usersTable.id, item.userId));

    const session = await lucia.createSession(item.userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return {
      success: true,
      message: "Password Changed. Welcome " + user.username,
    };
  } catch (error) {
    console.log("signIn ~ error:", error);
    return { success: false, message };
  }
};

export const authUser = async (id: string) => {
  const [userData] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, id));
  return userData || undefined;
};

const defaultFormFields = [
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
