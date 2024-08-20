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
  useSetScheduleFor,
  useSetScheduleForType,
} from "../../store";
import { ScheduleForType } from "@/types/type";
import { getDoctors } from "../../doctors/actions";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/utils";

type Props = {};

const SchedulerTab = (props: Props) => {
  const scheduleForType = useScheduleForType();
  const scheduleFor = useScheduleFor();

  const setScheduleForType = useSetScheduleForType();
  const setScheduleFor = useSetScheduleFor();

  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.doctors],
    queryFn: async () => await getDoctors(),
  });

  return (
    <div>
      <div className="flex items-center flex-col md:flex-row gap-8 my-8 justify-between">
        <div className="flex flex-col md:flex-row md:items-center gap-4 w-full">
          <p>Schedule For:</p>

          <Select
            value={scheduleForType}
            onValueChange={(e) => setScheduleForType(e)}
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

          <Select
            disabled={!scheduleForType}
            value={scheduleFor}
            onValueChange={(e) => setScheduleFor(e)}
          >
            <SelectTrigger className="w-full md:w-[150px] h-8">
              <SelectValue
                placeholder={
                  "Select " +
                    scheduleTypes.find((s) => s.value === scheduleFor)?.label ||
                  "value"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {scheduleTypes.map((scheduleType, i) => (
                <SelectItem key={i} value={scheduleType.value}>
                  {scheduleType.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex md:items-center justify-end flex-col md:flex-row w-full gap-2">
          <p>Status:</p>

          <Select
            value={scheduleForType}
            onValueChange={(e) => setScheduleForType(e)}
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
        </div>
      </div>

      <Scheduler />
    </div>
  );
};

export default SchedulerTab;

export const scheduleTypes: { label: string; value: ScheduleForType }[] = [
  { label: "Doctors", value: "doctors" },
  { label: "Doctor Types", value: "doctor-types" },
];
