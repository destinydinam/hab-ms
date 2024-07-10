import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { getDoctorName } from "@/lib/utils";
import { eq } from "drizzle-orm";

type Props = { params: { "doctor-id": string } };

const DoctorDetailsPage = async ({ params }: Props) => {
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
      {/* {doctor.firstName} */}
      <div className="my-6">
        <h2 className="font-semibold text-2xl"> {getDoctorName(doctor)}</h2>

        {/* <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="grid w-full grid-flow-col">
            {tablinks(doctor.id).map((tab, i) => (
              <TabsTrigger key={i} value={tab.name}>
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs> */}
      </div>
    </div>
  );
};

export default DoctorDetailsPage;

const tablinks = (id: string) => [
  { name: "Profile", url: "/admin/doctors/" + id + "/profile" },
  { name: "Availabilities", url: "/admin/doctors/" + id + "/availabilities" },
  { name: "Certifications", url: "/admin/doctors/" + id + "/certifications" },
  { name: "Work Experience", url: "/admin/doctors/" + id + "/work-experience" },
  { name: "Appointments", url: "/admin/doctors/" + id + "/appointments" },
];
