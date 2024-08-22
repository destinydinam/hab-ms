CREATE TABLE `slots` (
	`id` text PRIMARY KEY NOT NULL,
	`hospital_id` text NOT NULL,
	`updated_at` integer NOT NULL,
	`doctor_id` text NOT NULL,
	`start_time` text NOT NULL,
	`end_time` text NOT NULL,
	`form_email` text NOT NULL,
	`form_fullname` text NOT NULL,
	`form_inputs` text NOT NULL,
	`status` text NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
