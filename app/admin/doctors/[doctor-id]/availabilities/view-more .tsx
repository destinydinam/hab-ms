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
import { SelectOverride } from "@/db/schema";
import CenterDivs from "@/components/ui/center-divs";
import { convertToAmPm } from "@/lib/utils";

type Props = { override: SelectOverride };

const ViewMore = ({ override }: Props) => {
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

        <CenterDivs label="Start Date:" value={override.startDate} />
        <CenterDivs
          label="start Time:"
          value={convertToAmPm(override.startTime)}
        />
        <CenterDivs label="End Date:" value={override.endDate} />
        <CenterDivs label="End Time:" value={convertToAmPm(override.endTime)} />
        <CenterDivs label="Reason:" value={override.reason} />

        <br />

        <DialogClose asChild>
          <Button variant="default">Cancel</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ViewMore;
