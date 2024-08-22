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
import { getAppointmentFormFields, getAppointmentSettings } from "../actions";
import { durations, queryKeys } from "@/lib/utils";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddAppointmentFormFields from "./add-appointment-form-fields";
import CenterDivs from "@/components/ui/center-divs";
import AppointmentFormFieldsRow from "./appointment-form-fields-row";
import PreviewFormField from "./preview-form-fields";

type Props = {};

const SettingsTab = (props: Props) => {
  const { data } = useQuery({
    queryKey: [queryKeys["appointments-settings"]],
    queryFn: async () => await getAppointmentSettings(),
  });

  const { data: appointmentFormFields, isLoading } = useQuery({
    queryKey: [queryKeys["appointment-form-fields"]],
    queryFn: async () => await getAppointmentFormFields(),
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 bg-gray-300 p-4 lg:px-8 rounded-lg mb-20">
      <div className="col-span-1 lg:col-span-5 flex flex-col space-y-4">
        <div className="flex items-center gap-3 justify-between">
          <h2 className="font-semibold text-base md:text-lg py-2">
            Appointment Details
          </h2>

          {!!data?.data && (
            <EditAppointmentSettings appointmentSettings={data.data} />
          )}
        </div>

        <div className="bg-white h-full px-4 py-8 space-y-6 whitespace-nowrap rounded-lg">
          <CenterDivs
            className1="col-span-5"
            className2="col-span-7"
            label="Duration:"
            value={
              durations.find(
                (d) => d.value.toString() === data?.data?.duration!
              )?.label
            }
          />
          <CenterDivs
            className1="col-span-5"
            className2="col-span-7"
            label="Buffer Time:"
            value={
              durations.find(
                (d) => d.value.toString() === data?.data?.bufferTime!
              )?.label
            }
          />
          <CenterDivs
            className1="col-span-5"
            className2="col-span-7"
            label="Payment Before Booking:"
            value={data?.data?.paymentBeforeBooking}
          />
          <CenterDivs
            className1="col-span-5"
            className2="col-span-7"
            label="Show Doctor Name:"
            value={data?.data?.showDoctorName}
          />
        </div>
      </div>

      <div className="col-span-1 h-full lg:col-span-7">
        <div className="flex items-center gap-3 justify-between">
          <h2 className="font-semibold text-base md:text-lg py-2">
            Appointment Form
          </h2>

          <PreviewFormField
            appointmentFormFields={appointmentFormFields?.data || []}
          />
        </div>

        <div className="bg-white p-2 md:px-6 md:py-4 rounded-lg mt-4 pt-4">
          <p>
            Add or remove input fields from the scheduler form that will be
            shown to patients
          </p>

          <div className="my-4">
            <AddAppointmentFormFields />
          </div>

          <div className="rounded-md h-full border border-gray-300 bg-white">
            <Table>
              <TableHeader className="rounded-lg">
                <TableRow>
                  <TableHead>Row</TableHead>
                  <TableHead className="whitespace-nowrap">
                    Input Name
                  </TableHead>
                  <TableHead className="whitespace-nowrap">
                    Input Type
                  </TableHead>
                  <TableHead className="whitespace-nowrap">Required</TableHead>
                  <TableHead className="whitespace-nowrap">
                    Placeholder
                  </TableHead>
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
                ) : appointmentFormFields?.data?.length ? (
                  appointmentFormFields.data?.map((formField, index) => (
                    <AppointmentFormFieldsRow
                      key={index}
                      index={index}
                      formField={formField}
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
      </div>
    </div>
  );
};

export default SettingsTab;
