export type Days =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type InputTypes =
  | "text"
  | "email"
  | "textarea"
  | "phoneNumber"
  | "select"
  | "date"
  | "time";

export type ScheduleForType = "doctors" | "doctor-types";

export type ScheduleStatus = "all" | "booked" | "available" | "cancelled";

export type Slot = {
  date: Date;
  doctor: string;
  startTime: string;
  endTime: string;
  status: ScheduleStatus;
};
