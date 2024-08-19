"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { File } from "lucide-react";
import { useState } from "react";
import { SelectAppointmentFormFields } from "@/db/schema";
import CenterDivs from "@/components/ui/center-divs";

type Props = { formField: SelectAppointmentFormFields };

const ViewMore = ({ formField }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="p-2 h-8 hide-ring justify-between w-full"
        >
          View More
          <File className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Override</DialogTitle>
        </DialogHeader>

        <br />
        <br />

        <CenterDivs label="Input Name:" value={formField.inputName} />
        <CenterDivs label="Input Type:" value={formField.inputType} />
        <CenterDivs label="Required:" value={formField.required} />
        <CenterDivs label="Placeholder:" value={formField.placeholder} />

        {formField.inputType === "select" && (
          <CenterDivs
            label="Select Data:"
            value={
              <div className="flex flex-col gap-3">
                {(
                  JSON.parse(
                    (formField.selectData as string) || "[]"
                  ) as string[]
                ).map((value, i) => (
                  <div key={i}>
                    {i + 1}. {value}
                  </div>
                ))}
              </div>
            }
          />
        )}

        <br />

        <DialogClose asChild>
          <Button variant="default">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ViewMore;
