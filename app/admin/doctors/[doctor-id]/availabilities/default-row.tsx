import { Button } from "@/components/ui/button";
import { convertToAmPm } from "@/lib/utils";
import { Clock, Minus, Pencil } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import DeleteAvailability from "./delete-availability";
import { SelectWeeklyAvailabilities } from "@/db/schema";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  availabilitiesDays: SelectWeeklyAvailabilities[] | undefined;
  setEdit: Dispatch<SetStateAction<boolean>>;
};

const DefaultRow = ({ availabilitiesDays, setEdit }: Props) => {
  return (
    <div className="col-span-11 md:col-span-10 space-y-2">
      {availabilitiesDays?.map((d, j) => (
        <div
          key={j}
          className="grid text-[10px] md:text-sm grid-cols-12 w-full gap-2"
        >
          <div className="col-span-8 md:col-span-9 w-full items-center flex gap-1 md:gap-2 whitespace-nowrap h-fit">
            <div className="flex items-center gap-2 md:gap-4 bg-gray-50 border border-gray-300 px-2 rounded py-1 md:py-1.5">
              <p>{convertToAmPm(d.startTime)}</p>
              <Clock className="w-3 stroke-[2.5] h-3" />
            </div>

            <Minus className="w-2 md:w-3 h-4 min-w-2 md:min-w-3 min-h-4" />

            <div className="flex items-center gap-4 bg-gray-50 border border-gray-300 px-2 rounded py-1.5">
              <p>{convertToAmPm(d.endTime)}</p>
              <Clock className="w-3 stroke-[2.5] h-3" />
            </div>
          </div>

          <div className="col-span-4 md:col-span-3 flex gap-1 md:gap-3 px-1 md:px-2 items-center justify-end md:justify-start">
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => setEdit(true)}
                    size="sm"
                    variant="outline"
                    className="p-2 h-8 border-gray"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>
                  <p className="text-xs">Edit Availability</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DeleteAvailability availabilitiesDay={d} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DefaultRow;
