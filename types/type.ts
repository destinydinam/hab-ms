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

export interface Slot {
  date: Date;
  doctor: string;
  startTime: string;
  endTime: string;
  status: ScheduleStatus;
}

export interface ScheduleSlot extends Slot {
  Id: number;
  StartTime: Date;
  EndTime: Date;
  IsReadonly: boolean;
  Subject: string;
  Color: string;
  Guid: string;
}
