"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Scheduler from "./scheduler";
import {
  useScheduleFor,
  useScheduleForType,
  useScheduleStatus,
  useSetScheduleFor,
  useSetScheduleForType,
  useSetScheduleStatus,
} from "../../store";
import { ScheduleForType, ScheduleStatus, Slot } from "@/types/type";
import {
  getDoctors,
  getOverrides,
  getOverridesByHospitalId,
  getWeeklyAvailabilitiesByHospitalId,
} from "../../doctors/actions";
import { useQuery } from "@tanstack/react-query";
import {
  addMinutes,
  calculateDurations,
  checkOverlap,
  days,
  getDoctorName,
  queryKeys,
  scheduleStatuses,
} from "@/lib/utils";
import { doctorTypes } from "../../doctors/add-doctor";
import { getAppointmentSettings } from "../actions";
import { SelectOverride } from "@/db/schema";

type Props = {};

const MAX_BOOKING_DAYS = 30;

const SchedulerTab = (props: Props) => {
  const scheduleForType = useScheduleForType();
  const scheduleFor = useScheduleFor();
  const scheduleStatus = useScheduleStatus();

  const setScheduleForType = useSetScheduleForType();
  const setScheduleFor = useSetScheduleFor();
  const setScheduleStatus = useSetScheduleStatus();

  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.doctors],
    queryFn: async () => await getDoctors(),
  });

  const { data: availabilities, isLoading: isFetching } = useQuery({
    queryKey: [queryKeys["weekly-availabilities"]],
    queryFn: async () => await getWeeklyAvailabilitiesByHospitalId(),
  });

  const { data: appointmentSettings } = useQuery({
    queryKey: [queryKeys["appointments-settings"]],
    queryFn: async () => await getAppointmentSettings(),
  });

  const { data: overrides } = useQuery({
    queryKey: [queryKeys.overrides],
    queryFn: async () => await getOverridesByHospitalId(),
  });

  console.log({ availabilities, appointmentSettings, overrides });

  let values = [{ label: "All", value: "all" }];

  if (scheduleForType === "doctor-types")
    for (let i = 0; i < doctorTypes.length; i++)
      values.push({ label: doctorTypes[i], value: doctorTypes[i] });
  else {
    if (data?.data)
      for (let i = 0; i < data?.data?.length; i++) {
        const d = data?.data[i];
        values.push({ label: getDoctorName(d), value: d.id });
      }
  }

  const slots: Slot[] = [];

  if (availabilities?.data?.length && appointmentSettings?.data) {
    for (let i = 0; i < MAX_BOOKING_DAYS; i++) {
      const activeDate = addDays(i);
      const duration = +(appointmentSettings.data.duration || 0);
      const bufferTime = +(appointmentSettings.data.bufferTime || 0);

      availabilities.data.map((a) => {
        if (days[activeDate.getDay()] === a.day) {
          const durationsCount = calculateDurations({
            startTime: a.startTime,
            endTime: a.endTime,
            duration,
            bufferTime,
          });

          let startTime = a.startTime;

          let doctorOverrides: SelectOverride[] = [];

          if (overrides?.data?.length)
            doctorOverrides = overrides.data.filter(
              (o) => o.doctorId === a.doctorId
            );

          for (let j = 0; j < durationsCount; j++) {
            const endTime = addMinutes(startTime, duration);

            const newSlot = {
              date: activeDate,
              doctor: a.doctorId,
              startTime,
              endTime,
              status: scheduleStatuses.find(
                (status) => status.value === "available"
              )?.value!,
            };

            let isOverride = false;

            doctorOverrides.map((o) => {
              const response = checkOverlap({
                overrideStart: new Date(o.startDate + " " + o.startTime),
                overrideEnd: new Date(o.endDate + " " + o.endTime),
                newStart: new Date(
                  newSlot.date.toLocaleDateString() + " " + newSlot.startTime
                ),
                newEnd: new Date(
                  newSlot.date.toLocaleDateString() + " " + newSlot.endTime
                ),
              });

              if (!response.success) {
                isOverride = true;
                return;
              }
            });

            if (!isOverride) slots.push(newSlot);

            startTime = addMinutes(endTime, bufferTime);
          }
        }
      });
    }
  }

  // console.log("SchedulerTab ~ slots:", slots);

  return (
    <div>
      <div className="flex items-center flex-col md:flex-row gap-8 my-8 justify-between">
        <div className="flex flex-col md:flex-row md:items-center gap-4 w-full">
          <p>Schedule For:</p>

          <Select
            value={scheduleForType}
            onValueChange={(e: ScheduleForType) => {
              setScheduleForType(e);
              setScheduleFor("");
            }}
          >
            <SelectTrigger className="w-full md:w-[150px] h-8">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              {scheduleTypes.map((scheduleType, i) => (
                <SelectItem key={i} value={scheduleType.value}>
                  {scheduleType.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={scheduleFor} onValueChange={(e) => setScheduleFor(e)}>
            <SelectTrigger className="w-full md:w-[150px] h-8">
              <SelectValue
                placeholder={
                  "Select " +
                    scheduleTypes
                      .find((s) => s.value === scheduleForType)
                      ?.label.slice(0, -1) || "value"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {values?.map((value, i) => (
                <SelectItem key={i} value={value.value}>
                  {value.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex md:items-center justify-end flex-col md:flex-row w-full gap-2">
          <p>Status:</p>

          <Select
            value={scheduleStatus}
            onValueChange={(e: ScheduleStatus) => setScheduleStatus(e)}
          >
            <SelectTrigger className="w-full md:w-[150px] h-8">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {scheduleStatuses.map((s, i) => (
                <SelectItem key={i} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Scheduler slots={slots} />
    </div>
  );
};

export default SchedulerTab;

export const scheduleTypes: { label: string; value: ScheduleForType }[] = [
  { label: "Doctors", value: "doctors" },
  { label: "Doctor Types", value: "doctor-types" },
];

const addDays = (days: number) => {
  const currentDate = new Date();

  return new Date(currentDate.setDate(currentDate.getDate() + days));
};
