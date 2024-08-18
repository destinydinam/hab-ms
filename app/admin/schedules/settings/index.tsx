"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import EditAppointmentSettings from "./edit-appoinment-settings";
import { getAppointmentSettings } from "../actions";
import { queryKeys } from "@/lib/utils";

type Props = {};

const SettingsTab = (props: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys["appointments-settings"]],
    queryFn: async () => await getAppointmentSettings(),
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 bg-gray-300 p-4 lg:px-8 rounded-lg mb-20">
      <div className="col-span-1 lg:col-span-5  space-y-4">
        <div className="flex items-center gap-3 justify-between">
          <h2 className="font-semibold text-base md:text-lg py-2">
            Appointment Details
          </h2>

          {!!data?.data && (
            <EditAppointmentSettings appointmentSettings={data.data} />
          )}
        </div>

        <div className="bg-white px-4 py-1 rounded-lg"></div>
      </div>

      <div className="col-span-1 lg:col-span-7 bg-white px-6 py-6 rounded-lg lg:mt-[61px]">
        <div className="flex items-center gap-8 justify-between md:justify-start">
          <h2 className="font-semibold text-base md:text-lg py-2">Overrides</h2>
        </div>

        <div className="rounded-md border border-gray-300 bg-white mt-4">
          <Table>
            <TableHeader className="rounded-lg">
              <TableRow>
                <TableHead>Row</TableHead>
                <TableHead className="whitespace-nowrap">Start Date</TableHead>
                <TableHead className="whitespace-nowrap">Start Time</TableHead>
                <TableHead className="whitespace-nowrap">End Date</TableHead>
                <TableHead className="whitespace-nowrap">Ent Time</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    <Skeleton className="w-full bg-gray-300 h-10 mt-1" />
                    <Skeleton className="w-full bg-gray-300 h-10 mt-1" />
                    <Skeleton className="w-full bg-gray-300 h-10 mt-1" />
                  </TableCell>
                </TableRow>
              ) : data?.length ? (
                data?.map((_, index) => <div key={index}></div>)
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-10 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
