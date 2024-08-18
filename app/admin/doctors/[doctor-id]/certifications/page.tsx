"use client";

import { useParams } from "next/navigation";
import AddCertification from "./add-certification";
import { useQuery } from "@tanstack/react-query";
import { getCertifications } from "../../actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CertificationRow from "./certification-row";
import { Skeleton } from "@/components/ui/skeleton";
import { queryKeys } from "@/lib/utils";

type Props = {};

const CertificationsPage = (props: Props) => {
  const params = useParams();
  const doctorId = params["doctor-id"];

  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.certifications],
    queryFn: async () => await getCertifications(doctorId as string),
  });

  return (
    <div className="bg-gray-300 p-4 lg:px-8 rounded-lg mb-20">
      <div className="flex items-center justify-between md:justify-start gap-8">
        <h2 className="font-semibold text-base md:text-lg py-2">
          Doctor Certifications
        </h2>

        <AddCertification doctorId={doctorId as string} />
      </div>

      <div className="rounded-md border border-gray-300 bg-white mt-4">
        <Table>
          <TableHeader className="rounded-lg">
            <TableRow>
              <TableHead>Row</TableHead>
              <TableHead className="whitespace-nowrap">Cert Name</TableHead>
              <TableHead className="whitespace-nowrap">Date Issued</TableHead>
              <TableHead className="whitespace-nowrap">Expiry Date</TableHead>
              <TableHead>File</TableHead>
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
              data?.data?.map((certification, index) => (
                <CertificationRow
                  certification={certification}
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

export default CertificationsPage;
