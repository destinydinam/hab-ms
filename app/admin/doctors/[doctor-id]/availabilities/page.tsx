"use client";

import { days } from "@/lib/utils";
import { getOverrides, getWeeklyAvailabilities } from "../../actions";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import DayRow from "./day-row";
import AddOverride from "./add-override";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import OverrideRow from "./override-row";

const AvailabilitiesPage = () => {
  const params = useParams();
  const doctorId = params["doctor-id"];

  const { data, isLoading } = useQuery({
    queryKey: ["weekly-availabilities"],
    queryFn: async () => await getWeeklyAvailabilities(doctorId as string),
  });

  const { data: overrides, isLoading: isFetching } = useQuery({
    queryKey: ["overrides"],
    queryFn: async () => await getOverrides(doctorId as string),
  });

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 bg-gray-300 p-4 lg:px-8 rounded-lg mb-20">
        <div className="col-span-1 lg:col-span-5 space-y-4">
          <h2 className="font-semibold text-base md:text-lg py-2">
            Weekly Availabilities
          </h2>

          <div className="bg-white px-4 py-1 rounded-lg">
            <div className="grid grid-cols-12 gap-2 mt-4">
              <h3 className="font-semibold text-base col-span-1 md:col-span-2">
                Day
              </h3>

              <div className="col-span-10 grid grid-cols-12 gap-1">
                <h3 className="font-semibold text-base pl-4 col-span-8 md:col-span-9">
                  Hours
                </h3>
                <h3 className="font-semibold text-base col-span-4 justify-self-end md:justify-self-start md:col-span-3">
                  Actions
                </h3>
              </div>
            </div>

            <br />

            {days.map((day, i) => {
              const availabilitiesDays = data?.data?.filter(
                (d) => d.day === day
              );

              return (
                <DayRow
                  key={i}
                  availabilitiesDays={availabilitiesDays}
                  day={day}
                />
              );
            })}
          </div>
        </div>

        <div className="col-span-1 lg:col-span-7 bg-white px-6 py-6 lg:px-12 rounded-lg lg:mt-[61px]">
          <div className="flex items-center gap-8 justify-between md:justify-start">
            <h2 className="font-semibold text-base md:text-lg py-2">
              Overrides
            </h2>

            <AddOverride doctorId={doctorId as string} />
          </div>

          <div className="rounded-md border border-gray-300 bg-white mt-4">
            <Table>
              <TableHeader className="rounded-lg">
                <TableRow>
                  <TableHead>Row</TableHead>
                  <TableHead className="whitespace-nowrap">
                    Start Date
                  </TableHead>
                  <TableHead className="whitespace-nowrap">
                    Start Time
                  </TableHead>
                  <TableHead className="whitespace-nowrap">End Date</TableHead>
                  <TableHead className="whitespace-nowrap">Ent Time</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {overrides?.data?.map((override, index) => (
                  <OverrideRow override={override} index={index} key={index} />
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilitiesPage;
