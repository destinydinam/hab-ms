import { sqliteTable, AnySQLiteColumn, text, integer, uniqueIndex } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const appointment_form_fields = sqliteTable("appointment_form_fields", {
	id: text("id").primaryKey().notNull(),
	hospital_id: text("hospital_id").notNull(),
	inputName: text("inputName").notNull(),
	inputType: text("inputType").notNull(),
	required: text("required").notNull(),
	placeholder: text("placeholder").notNull(),
	select_data: text("select_data"),
	created_at: integer("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updated_at: integer("updated_at").notNull(),
});

export const appointment_settings = sqliteTable("appointment_settings", {
	id: text("id").primaryKey().notNull(),
	hospital_id: text("hospital_id").notNull(),
	duration: text("duration").notNull(),
	bufferTime: text("bufferTime").notNull(),
	payment_before_booking: text("payment_before_booking").notNull(),
	show_doctor_name: text("show_doctor_name").notNull(),
	created_at: integer("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updated_at: integer("updated_at").notNull(),
});

export const certifications = sqliteTable("certifications", {
	id: text("id").primaryKey().notNull(),
	doctor_id: text("doctor_id").notNull(),
	hospital_id: text("hospital_id").notNull(),
	certification_name: text("certification_name").notNull(),
	date_issued: text("date_issued").notNull(),
	expiry_date: text("expiry_date"),
	certificate_file: text("certificate_file"),
	created_at: integer("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updated_at: integer("updated_at").notNull(),
});

export const doctors = sqliteTable("doctors", {
	id: text("id").primaryKey().notNull(),
	hospital_id: text("hospital_id").notNull(),
	title: text("title").default("Dr").notNull(),
	first_name: text("first_name").notNull(),
	last_name: text("last_name").notNull(),
	other_names: text("other_names").default(""),
	date_of_birth: text("date_of_birth").notNull(),
	email: text("email").notNull(),
	phone_number: text("phone_number").notNull(),
	hire_date: text("hire_date").notNull(),
	start_date: text("start_date").notNull(),
	end_date: text("end_date"),
	start_time: text("start_time").notNull(),
	end_time: text("end_time").notNull(),
	doctor_type: text("doctor_type").notNull(),
	status: text("status"),
	image: text("image"),
	created_at: integer("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updated_at: integer("updated_at").notNull(),
},
(table) => {
	return {
		email_unique: uniqueIndex("doctors_email_unique").on(table.email),
	}
});

export const overrides = sqliteTable("overrides", {
	id: text("id").primaryKey().notNull(),
	hospital_id: text("hospital_id"),
	doctor_id: text("doctor_id").notNull(),
	start_date: text("start_date").notNull(),
	end_date: text("end_date").notNull(),
	start_time: text("start_time").notNull(),
	end_time: text("end_time").notNull(),
	reason: text("reason"),
	created_at: integer("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updated_at: integer("updated_at").notNull(),
});

export const password_reset_tokens = sqliteTable("password_reset_tokens", {
	id: text("id").primaryKey().notNull(),
	user_id: text("user_id", { length: 21 }).notNull(),
	expires_at: integer("expires_at").notNull(),
});

export const session = sqliteTable("session", {
	id: text("id").primaryKey().notNull(),
	user_id: text("user_id").notNull(),
	expires_at: integer("expires_at").notNull(),
});

export const users = sqliteTable("users", {
	id: text("id").primaryKey().notNull(),
	username: text("username").notNull(),
	hospital_name: text("hospital_name").notNull(),
	email: text("email").notNull(),
	address: text("address").notNull(),
	phoneNumber: text("phoneNumber").notNull(),
	hashed_password: text("hashed_password").notNull(),
	created_at: integer("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updated_at: integer("updated_at").notNull(),
	hospital_logo: text("hospital_logo"),
},
(table) => {
	return {
		email_unique: uniqueIndex("users_email_unique").on(table.email),
	}
});

export const weekly_availabilities = sqliteTable("weekly_availabilities", {
	id: text("id").primaryKey().notNull(),
	doctor_id: text("doctor_id").notNull(),
	day: text("day").notNull(),
	start_time: text("start_time").notNull(),
	end_time: text("end_time").notNull(),
	created_at: integer("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updated_at: integer("updated_at").notNull(),
	hospital_id: text("hospital_id"),
});

export const work_experience = sqliteTable("work_experience", {
	id: text("id").primaryKey().notNull(),
	doctor_id: text("doctor_id").notNull(),
	hospital_id: text("hospital_id").notNull(),
	company_name: text("company_name").notNull(),
	job_title: text("job_title").notNull(),
	start_date: text("start_date"),
	end_date: text("end_date"),
	created_at: integer("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updated_at: integer("updated_at").notNull(),
});

export const slots = sqliteTable("slots", {
	id: text("id").primaryKey().notNull(),
	hospital_id: text("hospital_id").notNull(),
	updated_at: integer("updated_at").notNull(),
	doctor_id: text("doctor_id").notNull(),
	start_time: text("start_time").notNull(),
	end_time: text("end_time").notNull(),
	form_email: text("form_email").notNull(),
	form_fullname: text("form_fullname").notNull(),
	form_inputs: text("form_inputs").notNull(),
	status: text("status").notNull(),
	created_at: integer("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});