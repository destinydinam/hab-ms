CREATE TABLE `appointment_form_fields` (
	`id` text PRIMARY KEY NOT NULL,
	`hospital_id` text NOT NULL,
	`inputName` text NOT NULL,
	`inputType` text NOT NULL,
	`required` text NOT NULL,
	`placeholder` text NOT NULL,
	`select_data` text,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `appointment_settings` (
	`id` text PRIMARY KEY NOT NULL,
	`hospital_id` text NOT NULL,
	`duration` text NOT NULL,
	`bufferTime` text NOT NULL,
	`payment_before_booking` text NOT NULL,
	`show_doctor_name` text NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `certifications` (
	`id` text PRIMARY KEY NOT NULL,
	`doctor_id` text NOT NULL,
	`hospital_id` text NOT NULL,
	`certification_name` text NOT NULL,
	`date_issued` text NOT NULL,
	`expiry_date` text,
	`certificate_file` text,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `doctors` (
	`id` text PRIMARY KEY NOT NULL,
	`hospital_id` text NOT NULL,
	`title` text DEFAULT 'Dr' NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`other_names` text DEFAULT '',
	`date_of_birth` text NOT NULL,
	`email` text NOT NULL,
	`phone_number` text NOT NULL,
	`hire_date` text NOT NULL,
	`start_date` text NOT NULL,
	`end_date` text,
	`start_time` text NOT NULL,
	`end_time` text NOT NULL,
	`doctor_type` text NOT NULL,
	`status` text,
	`image` text,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `overrides` (
	`id` text PRIMARY KEY NOT NULL,
	`hospital_id` text,
	`doctor_id` text NOT NULL,
	`start_date` text NOT NULL,
	`end_date` text NOT NULL,
	`start_time` text NOT NULL,
	`end_time` text NOT NULL,
	`reason` text,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `password_reset_tokens` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text(21) NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`hospital_name` text NOT NULL,
	`email` text NOT NULL,
	`address` text NOT NULL,
	`phoneNumber` text NOT NULL,
	`hashed_password` text NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `weekly_availabilities` (
	`id` text PRIMARY KEY NOT NULL,
	`doctor_id` text NOT NULL,
	`day` text NOT NULL,
	`start_time` text NOT NULL,
	`end_time` text NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `work_experience` (
	`id` text PRIMARY KEY NOT NULL,
	`doctor_id` text NOT NULL,
	`hospital_id` text NOT NULL,
	`company_name` text NOT NULL,
	`job_title` text NOT NULL,
	`start_date` text,
	`end_date` text,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `doctors_email_unique` ON `doctors` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);