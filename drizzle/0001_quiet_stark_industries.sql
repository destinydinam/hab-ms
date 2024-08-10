CREATE TABLE `weekly_availabilities` (
	`id` text PRIMARY KEY NOT NULL,
	`doctor_id` text NOT NULL,
	`day` text NOT NULL,
	`start_time` text NOT NULL,
	`end_time` text NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer NOT NULL
);
