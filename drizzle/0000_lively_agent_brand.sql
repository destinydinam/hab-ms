CREATE TABLE `doctors` (
	`id` text PRIMARY KEY NOT NULL,
	`hospital_id` text NOT NULL,
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
CREATE UNIQUE INDEX `doctors_email_unique` ON `doctors` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);