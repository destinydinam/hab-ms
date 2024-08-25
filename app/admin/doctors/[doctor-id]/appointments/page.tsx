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
import { convertToAmPm, queryKeys } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getAppointments } from "../../actions";

type Props = {};

const AppointmentsPage = (props: Props) => {
  const params = useParams();
  const doctorId = params["doctor-id"];

  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.appointments],
    queryFn: async () => getAppointments(doctorId as string),
  });

  return (
    <div className="bg-gray-300 p-4 lg:px-8 rounded-lg mb-20">
      <h2 className="font-semibold text-base md:text-lg py-2">Appointments</h2>

      <div className="rounded-md border border-gray-300 bg-white mt-4">
        <Table>
          <TableHeader className="rounded-lg">
            <TableRow>
              <TableHead>Row</TableHead>
              <TableHead className="whitespace-nowrap">Date</TableHead>
              <TableHead className="whitespace-nowrap">Period</TableHead>
              <TableHead className="whitespace-nowrap">Status</TableHead>
              <TableHead className="whitespace-nowrap"></TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <Skeleton className="w-full bg-gray-300 h-10 mt-1" />
                  <Skeleton className="w-full bg-gray-300 h-10 mt-1" />
                  <Skeleton className="w-full bg-gray-300 h-10 mt-1" />
                </TableCell>
              </TableRow>
            ) : data?.data?.length ? (
              data.data?.map((slot, i) => (
                <TableRow key={i}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{slot.date.toLocaleDateString()}</TableCell>
                  <TableCell>
                    {convertToAmPm(slot.startTime)} -{" "}
                    {convertToAmPm(slot.endTime)}
                  </TableCell>
                  <TableCell>{slot.status}</TableCell>
                  {/* <TableCell>{}</TableCell> */}
                  {/* <TableCell>{certification.dateIssued}</TableCell>
              <TableCell>{certification.expiryDate}</TableCell>
              <TableCell>{certification.certificateFile}</TableCell> */}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-10 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AppointmentsPage;
