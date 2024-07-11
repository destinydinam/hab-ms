import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { cn, getDoctorName } from "@/lib/utils";
import { eq } from "drizzle-orm";
import TabLinks from "./tab-links";
import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";

type Props = { params: { "doctor-id": string }; children: ReactNode };

const DoctorLayout = async ({ params, children }: Props) => {
  const [doctor] = await db
    .select()
    .from(doctorsTable)
    .where(eq(doctorsTable.id, params["doctor-id"]));

  if (!doctor)
    return (
      <div className="text-xl font-semibold mx-auto text-center my-20">
        Doctor not found
      </div>
    );

  return (
    <div className="px-4">
      <div className="my-10 flex justify-between gap-3">
        <h2 className="font-semibold text-xl md:text-2xl">
          {getDoctorName(doctor)}
          <Badge
            variant="outline"
            className={cn(
              "ml-4",
              doctor.status === "active"
                ? "bg-green-100 text-green-600 border border-green-200"
                : "bg-red-100 text-red-600 border border-red-200"
            )}
          >
            {doctor.status}
          </Badge>
        </h2>
        <TabLinks doctorId={doctor.id} />
      </div>

      {children}
    </div>
  );
};

export default DoctorLayout;
