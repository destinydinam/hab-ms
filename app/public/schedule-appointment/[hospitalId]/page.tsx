import {
  getAppointmentFormFieldsPublic,
  getAppointmentSettingsPublic,
} from "@/app/admin/schedules/actions";
import { authUser } from "@/app/auth/actions";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SchedulerSection from "./scheduler-section";
import {
  getDoctorsPublic,
  getOverridesByHospitalIdPublic,
  getWeeklyAvailabilitiesByHospitalIdPublic,
} from "@/app/admin/doctors/actions";

type Props = { params: { hospitalId: string } };

const ScheduleAppointmentPage = async ({ params: { hospitalId } }: Props) => {
  if (!hospitalId)
    return (
      <div className="text-3xl text-center my-10">
        Invalid hospital ID. Please provide a valid hospital ID.
      </div>
    );

  const user = await authUser(hospitalId);

  if (!user)
    return (
      <div className="text-3xl text-center my-10">
        Invalid hospital ID. Please provide a valid hospital ID.
      </div>
    );

  const appointmentSettings = await getAppointmentSettingsPublic(hospitalId);
  const doctors = await getDoctorsPublic(hospitalId);
  const availabilities =
    await getWeeklyAvailabilitiesByHospitalIdPublic(hospitalId);
  const overrides = await getOverridesByHospitalIdPublic(hospitalId);
  const appointmentFormFields =
    await getAppointmentFormFieldsPublic(hospitalId);

  return (
    <div className="max-w-screen-2xl px-4 md:px-8">
      <div className="flex items-center justify-between py-2 h-20">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            width={900}
            height={900}
            priority
            className="w-20"
          />
        </Link>

        <div className="flex font-semibold items-end gap-2">
          <Clock className="h-5 w-5" />
          <p>{appointmentSettings.data?.duration} min</p>
        </div>
      </div>

      <h2 className="text-base md:text-center my-4">
        Book an appointment at{" "}
        <span className="font-semibold">{user.hospitalName}</span>
      </h2>

      {doctors.data?.length &&
        appointmentSettings.data &&
        availabilities.data?.length && (
          <SchedulerSection
            doctors={doctors.data}
            appointmentSettings={appointmentSettings.data}
            availabilities={availabilities.data}
            overrides={overrides.data || []}
            hospitalId={hospitalId}
            appointmentFormFields={appointmentFormFields?.data || []}
          />
        )}
    </div>
  );
};

export default ScheduleAppointmentPage;
