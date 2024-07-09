import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from ".";

// ===========  USER + AUTH  =============

export const usersTable = sqliteTable("users", {
  id: text("id").notNull().primaryKey(),
  firstName: text("first_name").notNull(),
  otherNames: text("other_names").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").unique().notNull(),
  hasDoneResetPassword: integer("has_done_reset_password", { mode: "boolean" }),
  hashedPassword: text("hashed_password").notNull(),
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

// export const surveyTable = sqliteTable("survery", {
//   id: integer("id").notNull().primaryKey({ autoIncrement: true }),
//   userId: text("user_id").notNull(),
//   class: text("class").notNull(),
//   do_you_approve_the_adoption_of_the_constitution: text(
//     "do_you_approve_the_adoption_of_the_constitution"
//   ).notNull(),
//   objection: text("objection"),
//   updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
//   createdAt: integer("created_at", { mode: "timestamp" })
//     .default(sql`CURRENT_TIMESTAMP`)
//     .notNull(),
// });

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

// export type InsertSurvey = typeof surveyTable.$inferInsert;
// export type SelectSurvey = typeof surveyTable.$inferSelect;
