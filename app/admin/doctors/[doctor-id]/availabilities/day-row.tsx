import { SelectWeeklyAvailabilities } from "@/db/schema";
import { Days } from "@/types/type";
import { useState } from "react";
import DefaultRow from "./default-row";
import EditRow from "./edit-row";

type Props = {
  day: Days;
  availabilitiesDays: SelectWeeklyAvailabilities[] | undefined;
};

const DayRow = ({ day, availabilitiesDays }: Props) => {
  const [edit, setEdit] = useState(false);

  return (
    <div className="grid grid-cols-12 bg-gray-200 px-2 md:px-3 rounded-lg my-4 py-4 w-full gap-2">
      <div className="font-semibold mt-1 my-auto h-full w-full col-span-1 md:col-span-2 capitalize">
        {day.slice(0, 3)}
      </div>

      {edit ? (
        <div className="col-span-11 md:col-span-10 space-y-2">
          {availabilitiesDays?.map((d, j) => (
            <EditRow key={j} availabilitiesDay={d} setEdit={setEdit} />
          ))}
        </div>
      ) : (
        <DefaultRow availabilitiesDays={availabilitiesDays} setEdit={setEdit} />
      )}
    </div>
  );
};

export default DayRow;
