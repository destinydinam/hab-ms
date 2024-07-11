import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import EditDoctor from "./edit-doctor";

type Props = { params: { "doctor-id": string } };

const DoctorDetailsPage = async ({ params }: Props) => {
  const [doctor] = await db
    .select()
    .from(doctorsTable)
    .where(eq(doctorsTable.id, params["doctor-id"]));

  return (
    <div className="bg-gray-300 p-4 rounded-md">
      <br />
      <div className="flex justify-end w-full">
        <EditDoctor doctor={doctor} />
      </div>
      <br />
      <br />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="col-span-1 md:col-span-5 bg-white p-4 rounded-md">
          {/* picture */}
        </div>
        <div className="col-span-1 md:col-span-7 bg-white p-4 rounded-md">
          {/* Basic Details */}
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailsPage;
