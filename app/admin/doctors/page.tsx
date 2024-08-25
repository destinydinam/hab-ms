import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import AddDoctor from "./add-doctor";
import { db } from "@/db";
import { SelectDoctor, doctorsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { validateRequest } from "@/auth";
import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { convertToAmPm, urls } from "@/lib/utils";
import Link from "next/link";

const DoctorsPage = async () => {
  const { user } = await validateRequest();

  const doctors = await db
    .select()
    .from(doctorsTable)
    .where(eq(doctorsTable.hospitalId, user?.id!));

  return (
    <div className="max-w-7xl mx-auto px-4">
      <br />
      <br />
      <h2 className="font-semibold text-xl">Doctors</h2>

      <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4" />
          <Input
            placeholder="Search..."
            className="pl-10 h-9 w-full md:w-60 rounded-md border border-gray-400"
          />
        </div>

        <div className="flex gap-4 items-center">
          {/* filter */}
          <AddDoctor />
        </div>
      </div>

      <br />
      <br />
      <br />

      <Suspense fallback={<>loading....</>}>
        <DoctorsList doctors={doctors} />
      </Suspense>

      <br />
      <br />
    </div>
  );
};

export default DoctorsPage;

const DoctorsList = ({ doctors }: { doctors: SelectDoctor[] }) => {
  return doctors?.length ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
      {doctors.map((doctor, i) => (
        <Link key={i} href={urls.admin.doctors + "/" + doctor.id}>
          <Card className="py-4 border-gray-300 hover:border-gray-400 hover:shadow transition-all duration-300 ease-in-out">
            <CardContent className="text-center p-0 flex flex-col gap-3 items-center justify-center">
              <Image
                alt={doctor.firstName}
                src={doctor.image || "/placeholder.png"}
                width={1000}
                height={1000}
                priority
                className="w-24"
              />

              <p className="font-semibold mt-2">
                {doctor.title || "Dr"}. {doctor.firstName} {doctor.lastName}
              </p>
              <p className="text-gray-600">
                Working Hours: {convertToAmPm(doctor.startTime)} -{" "}
                {convertToAmPm(doctor.endTime)}
              </p>
              <div className="flex items-center px-1 md:px-3 gap-2 w-full justify-between">
                <p className="text-custom-primary">{doctor.doctorType}</p>
                <p>Schedules: {"13"}</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  ) : (
    <div className="text-xl my-20 text-center font-semibold mx-auto">
      No Doctors Found
    </div>
  );
};
