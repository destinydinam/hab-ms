"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Scheduler from "./scheduler";
import { Slot } from "@/types/type";
import {
  addMinutes,
  calculateDurations,
  checkOverlap,
  days,
  scheduleStatuses,
} from "@/lib/utils";
import {
  SelectAppointmentFormFields,
  SelectAppointmentSettings,
  SelectDoctor,
  SelectOverride,
  SelectSlot,
  SelectWeeklyAvailabilities,
} from "@/db/schema";
import { useDoctorSpecialty, useSetDoctorSpecialty } from "./store";
import { doctorTypes } from "@/app/admin/doctors/data";

type Props = {
  hospitalId: string;
  doctors: SelectDoctor[];
  availabilities: SelectWeeklyAvailabilities[];
  appointmentSettings: SelectAppointmentSettings;
  overrides: SelectOverride[];
  appointmentFormFields: SelectAppointmentFormFields[];
  appointmentSlots: SelectSlot[];
};

const MAX_BOOKING_DAYS = 30;

const SchedulerSection = ({
  hospitalId,
  appointmentSettings,
  availabilities,
  doctors,
  overrides,
  appointmentFormFields,
  appointmentSlots = [],
}: Props) => {
  const doctorSpecialty = useDoctorSpecialty();
  const setDoctorSpecialty = useSetDoctorSpecialty();

  let slots: Slot[] = [];

  for (let i = 0; i < MAX_BOOKING_DAYS; i++) {
    const activeDate = addDays(i);
    const duration = +(appointmentSettings.duration || 0);
    const bufferTime = +(appointmentSettings.bufferTime || 0);

    availabilities.map((a) => {
      if (
        doctors.find((d) => d.id === a.doctorId)?.status === "active" &&
        days[activeDate.getDay()] === a.day
      ) {
        const durationsCount = calculateDurations({
          startTime: a.startTime,
          endTime: a.endTime,
          duration,
          bufferTime,
        });

        let startTime = a.startTime;

        if (
          new Date() >
          new Date(activeDate.toLocaleDateString() + " " + startTime)
        ) {
          return;
        }

        let doctorOverrides: SelectOverride[] = [];

        if (overrides?.length)
          doctorOverrides = overrides.filter((o) => o.doctorId === a.doctorId);

        for (let j = 0; j < durationsCount; j++) {
          const endTime = addMinutes(startTime, duration);

          if (
            !appointmentSlots.find(
              (slot) =>
                slot.date?.toLocaleDateString() ===
                  activeDate.toLocaleDateString() &&
                slot.doctorId === a.doctorId &&
                !checkOverlap({
                  overrideStart: new Date(
                    slot.date?.toLocaleDateString() + " " + slot.startTime
                  ),
                  overrideEnd: new Date(
                    slot.date?.toLocaleDateString() + " " + slot.endTime
                  ),
                  newStart: new Date(
                    activeDate.toLocaleDateString() + " " + startTime
                  ),
                  newEnd: new Date(
                    activeDate.toLocaleDateString() + " " + endTime
                  ),
                }).success
            )
          ) {
            const newSlot = {
              date: activeDate,
              doctorId: a.doctorId,
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
          }
          startTime = addMinutes(endTime, bufferTime);
        }
      }
    });
  }

  if (slots.length) {
    slots = (() => {
      if (doctorSpecialty) {
        slots = slots.filter(
          (item) =>
            doctors.find((d) => d.id === item.doctorId)?.doctorType ===
            doctorSpecialty
        );
      } else slots = slots;

      return slots;
    })();
  }

  return (
    <div>
      <div className="flex items-center flex-col md:flex-row gap-8 my-8 justify-between">
        <div className="flex flex-col md:flex-row md:items-center gap-4 w-full">
          <p>Doctor Specialty:</p>

          <Select
            value={doctorSpecialty}
            onValueChange={(e) => setDoctorSpecialty(e)}
          >
            <SelectTrigger className="w-full md:w-[150px] h-8">
              <SelectValue
                className="text-red-600"
                placeholder="Select a type"
              />
            </SelectTrigger>
            <SelectContent>
              {doctorTypes.map((doctoryType, i) => (
                <SelectItem key={i} value={doctoryType}>
                  {doctoryType}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <small className="text-end block my-2">
        Select your slot from the available slots
      </small>

      <Scheduler
        slots={slots}
        hospitalId={hospitalId}
        appointmentDuration={appointmentSettings.duration}
        appointmentFormFields={appointmentFormFields}
        doctorSpecialty={doctorSpecialty}
      />

      <br />
      <br />
    </div>
  );
};

export default SchedulerSection;

const addDays = (days: number) => {
  const currentDate = new Date();

  return new Date(currentDate.setDate(currentDate.getDate() + days));
};
