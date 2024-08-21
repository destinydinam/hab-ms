import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from ".";

// ===========  USER + AUTH  =============

export const usersTable = sqliteTable("users", {
  id: text("id").notNull().primaryKey(),
  username: text("username").notNull(),
  hospitalName: text("hospital_name").notNull(),
  email: text("email").unique().notNull(),
  address: text("address").notNull(),
  phoneNumber: text("phoneNumber").notNull(),
  hashedPassword: text("hashed_password").notNull(),
  hospitalLogo: text("hospital_logo"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const sessionTable = sqliteTable("session", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id").notNull(),
  expiresAt: integer("expires_at").notNull(),
});

export const passwordResetTokensTable = sqliteTable("password_reset_tokens", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id", { length: 21 }).notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
});

export const adapter = new DrizzleSQLiteAdapter(db, sessionTable, usersTable);

// =============  MAIN SCHEMA  =============

export const doctorsTable = sqliteTable("doctors", {
  id: text("id").notNull().primaryKey(),
  hospitalId: text("hospital_id").notNull(),
  title: text("title").default("Dr").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  otherNames: text("other_names").default(""),
  dateOfBirth: text("date_of_birth").notNull(),
  email: text("email").unique().notNull(),
  phoneNumber: text("phone_number").notNull(),
  hireDate: text("hire_date").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  doctorType: text("doctor_type").notNull(),
  status: text("status", { enum: ["active", "inactive"] }),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const weeklyAvailabilitiesTable = sqliteTable("weekly_availabilities", {
  id: text("id").notNull().primaryKey(),
  doctorId: text("doctor_id").notNull(),
  hospitalId: text("hospital_id"),
  day: text("day", {
    enum: [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ],
  }).notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const overridesTable = sqliteTable("overrides", {
  id: text("id").notNull().primaryKey(),
  hospitalId: text("hospital_id"),
  doctorId: text("doctor_id").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  reason: text("reason"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const certificationsTable = sqliteTable("certifications", {
  id: text("id").notNull().primaryKey(),
  doctorId: text("doctor_id").notNull(),
  hospitalId: text("hospital_id").notNull(),

  certificationName: text("certification_name").notNull(),
  dateIssued: text("date_issued").notNull(),
  expiryDate: text("expiry_date"),
  certificateFile: text("certificate_file"),

  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const workExperienceTable = sqliteTable("work_experience", {
  id: text("id").notNull().primaryKey(),
  doctorId: text("doctor_id").notNull(),
  hospitalId: text("hospital_id").notNull(),

  companyName: text("company_name").notNull(),
  jobTitle: text("job_title").notNull(),
  startDate: text("start_date"),
  endDate: text("end_date"),

  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const appointmentSettingsTable = sqliteTable("appointment_settings", {
  id: text("id").notNull().primaryKey(),
  hospitalId: text("hospital_id").notNull(),

  duration: text("duration").notNull(),
  bufferTime: text("bufferTime").notNull(),
  paymentBeforeBooking: text("payment_before_booking").notNull(),
  showDoctorName: text("show_doctor_name").notNull(),

  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

// this table helps to configure the fields the hospital
// wants the patient to fill before they book an appointment
export const appointmentFormFieldsTable = sqliteTable(
  "appointment_form_fields",
  {
    id: text("id").notNull().primaryKey(),
    hospitalId: text("hospital_id").notNull(),

    inputName: text("inputName").notNull(),
    inputType: text("inputType", {
      enum: [
        "text",
        "email",
        "textarea",
        "phoneNumber",
        "select",
        "date",
        "time",
      ],
    }).notNull(),
    required: text("required").notNull(),
    placeholder: text("placeholder").notNull(),
    selectData: text("select_data", { mode: "json" }),

    createdAt: integer("created_at", { mode: "timestamp" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  }
);

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertDoctor = typeof doctorsTable.$inferInsert;
export type SelectDoctor = typeof doctorsTable.$inferSelect;

export type InsertWeeklyAvailabilities =
  typeof weeklyAvailabilitiesTable.$inferInsert;
export type SelectWeeklyAvailabilities =
  typeof weeklyAvailabilitiesTable.$inferSelect;

export type InsertOverride = typeof overridesTable.$inferInsert;
export type SelectOverride = typeof overridesTable.$inferSelect;

export type InsertCertification = typeof certificationsTable.$inferInsert;
export type SelectCertification = typeof certificationsTable.$inferSelect;

export type InsertWorkExperience = typeof workExperienceTable.$inferInsert;
export type SelectWorkExperience = typeof workExperienceTable.$inferSelect;

export type InsertAppointmentSettings =
  typeof appointmentSettingsTable.$inferInsert;
export type SelectAppointmentSettings =
  typeof appointmentSettingsTable.$inferSelect;

export type InsertAppointmentFormFields =
  typeof appointmentFormFieldsTable.$inferInsert;
export type SelectAppointmentFormFields =
  typeof appointmentFormFieldsTable.$inferSelect;
