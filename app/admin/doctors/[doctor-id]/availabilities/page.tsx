"use client";

import { Button } from "@/components/ui/button";
import { convertToAmPm, days } from "@/lib/utils";
import { Check, Clock, Minus, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { getWeeklyAvailabilities } from "../../actions";
import { useQuery } from "@tanstack/react-query";
import { useParams, usePathname } from "next/navigation";

type Props = {};

const AvailabilitiesPage = (props: Props) => {
  const [showEdit, setShowEdit] = useState(false);

  const params = useParams();
  const doctorId = params["doctor-id"];

  const { data, isLoading } = useQuery({
    queryKey: ["weekly-availabilities"],
    queryFn: async () => await getWeeklyAvailabilities(doctorId as string),
  });

  console.log("AvailabilitiesPage ~ data:", data);

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 bg-gray-300 p-4 lg:px-8 rounded-lg mb-20">
        <div className="col-span-1 lg:col-span-5 space-y-4">
          <div className="flex justify-between w-full py-2">
            <h2 className="font-semibold text-lg">Weekly Availabilities</h2>

            {showEdit ? (
              <Button
                onClick={() => setShowEdit(false)}
                size="sm"
                className="gap-4 px-4 pr-14"
              >
                <Check className="w-4 h-4" />
                Update
              </Button>
            ) : (
              <Button
                onClick={() => setShowEdit(true)}
                size="sm"
                className="gap-4 px-4 pr-14"
              >
                <Pencil className="w-4 h-4" />
                Edit
              </Button>
            )}
          </div>

          <div className="bg-white px-4 py-1 rounded-lg">
            <div className="grid grid-cols-12 gap-8 mt-4">
              <h3 className="font-semibold text-base col-span-2">Day</h3>
              <h3 className="font-semibold text-base col-span-7">Hours</h3>
              <h3 className="font-semibold text-base col-span-3">Actions</h3>
            </div>

            <br />

            {days.map((day, i) => {
              const availabilitiesDays = data?.data?.filter(
                (d) => d.day === day
              );

              return (
                <div
                  key={i}
                  className="grid grid-cols-12 bg-gray-200 px-3 rounded-lg my-4 py-4 w-full"
                >
                  <div className="font-semibold my-auto h-full w-full col-span-2 capitalize">
                    {day.slice(0, 3)}
                  </div>

                  <div className="col-span-10 space-y-2">
                    {availabilitiesDays?.map((d, j) => (
                      <div key={j} className="grid grid-cols-12 w-full gap-2">
                        <div className="col-span-9 w-full items-center flex gap-2 whitespace-nowrap h-fit">
                          <div className="flex items-center gap-4 bg-gray-50 border border-gray-300 px-2 rounded-md py-1.5">
                            <p>{convertToAmPm(d.startTime)}</p>
                            <Clock className="w-3 stroke-[2.5] h-3" />
                          </div>

                          <Minus className="w-3 h-4 min-w-3 min-h-4" />

                          <div className="flex items-center gap-4 bg-gray-50 border border-gray-300 px-2 rounded-md py-1.5">
                            <p>{convertToAmPm(d.endTime)}</p>
                            <Clock className="w-3 stroke-[2.5] h-3" />
                          </div>
                        </div>

                        <div className="col-span-3 flex gap-3 px-2 items-center">
                          <Button
                            size="sm"
                            variant="outline"
                            className="p-2 h-8 hide-ring"
                            disabled
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="p-2 h-8 hide-ring"
                            disabled
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="col-span-1 lg:col-span-7 bg-white px-6 py-6 lg:px-12 rounded-lg lg:mt-[70px]">
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
            recusandae illo id porro incidunt officiis. Architecto, veniam. Quo
            ipsum, aliquam exercitationem soluta quia explicabo ea dolorum
            consequatur rem recusandae delectus!
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilitiesPage;
