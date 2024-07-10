CREATE TABLE `doctors` (
	`id` text PRIMARY KEY NOT NULL,
	`hospital_id` text NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`other_names` text NOT NULL,
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
CREATE UNIQUE INDEX `doctors_email_unique` ON `doctors` (`email`);