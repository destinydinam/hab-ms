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
