import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import EditDoctor from "./edit-doctor";
import Image from "next/image";
import { cn, getDoctorName, getHours } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import CenterDivs from "@/components/ui/center-divs";

type Props = { params: { "doctor-id": string } };

const DoctorDetailsPage = async ({ params }: Props) => {
  const [doctor] = await db
    .select()
    .from(doctorsTable)
    .where(eq(doctorsTable.id, params["doctor-id"]));

  return (
    <div className="bg-gray-300 p-4 md:px-8 rounded-md mb-4">
      <div className="flex justify-end w-full">
        <EditDoctor doctor={doctor} />
      </div>

      <br />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
        <div className="col-span-1 md:col-span-5 bg-white px-4 py-10 rounded-md">
          <Image
            src={doctor.image || "/placeholder.png"}
            alt={doctor.firstName}
            width={4000}
            height={4000}
            className="w-40 md:w-48 mx-auto"
          />
          <h3 className="font-semibold mb-2 text-center text-2xl mt-10">
            {getDoctorName(doctor)}
          </h3>
          <p className="text-gray-600 text-center">{doctor.doctorType}</p>
        </div>
        <div className="col-span-1 md:col-span-7 bg-white px-6 py-6 md:px-12 rounded-md">
          <Badge
            variant="outline"
            className="bg-gray-200 px-3 rounded-md border border-gray-200"
          >
            Basic Details
          </Badge>

          <div className="mt-12 space-y-5 md:px-10">
            <CenterDivs label="Email" value={doctor.email} />
            <CenterDivs label="Date of Birth" value={doctor.dateOfBirth} />
            <CenterDivs
              label="Working Hours"
              value={
                doctor.startTime +
                " to " +
                doctor.endTime +
                "  (" +
                getHours(doctor.startTime, doctor.endTime) +
                "H)"
              }
            />
            <CenterDivs
              label="Status"
              value={
                <Badge
                  variant="outline"
                  className={cn(
                    "px-2",
                    doctor.status === "active"
                      ? "bg-green-100 text-green-600 border border-green-200"
                      : "bg-red-100 text-red-600 border border-red-200"
                  )}
                >
                  {doctor.status}
                </Badge>
              }
            />
            <CenterDivs label="Start Date" value={doctor.startDate} />
            <CenterDivs label="End Date" value={doctor.endDate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailsPage;
