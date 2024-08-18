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
ALTER TABLE `overrides` ADD `hospital_id` text;