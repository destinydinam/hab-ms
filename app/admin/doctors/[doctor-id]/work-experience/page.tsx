"use client";

import { useParams } from "next/navigation";
import AddCertification from "./add-work-experience";
import { useQuery } from "@tanstack/react-query";
import { getWorkExperience } from "../../actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import WorkExperienceRow from "./work-experience-row";
import { queryKeys } from "@/lib/utils";

type Props = {};

const WorkExperiencePage = (props: Props) => {
  const params = useParams();
  const doctorId = params["doctor-id"];

  const { data, isLoading } = useQuery({
    queryKey: [queryKeys["work-experience"]],
    queryFn: async () => await getWorkExperience(doctorId as string),
  });

  return (
    <div className="bg-gray-300 p-4 lg:px-8 rounded-lg mb-20">
      <div className="flex items-center justify-between md:justify-start gap-8">
        <h2 className="font-semibold text-base md:text-lg py-2">
          Work Experience
        </h2>

        <AddCertification doctorId={doctorId as string} />
      </div>

      <div className="rounded-md border border-gray-300 bg-white mt-4">
        <Table>
          <TableHeader className="rounded-lg">
            <TableRow>
              <TableHead>Row</TableHead>
              <TableHead className="whitespace-nowrap">Company Name</TableHead>
              <TableHead className="whitespace-nowrap">Job Title</TableHead>
              <TableHead className="whitespace-nowrap">Start Date</TableHead>
              <TableHead className="whitespace-nowrap">End Date</TableHead>
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
              data?.data?.map((workExperience, index) => (
                <WorkExperienceRow
                  workExperience={workExperience}
                  index={index}
                  key={index}
                />
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

export default WorkExperiencePage;
