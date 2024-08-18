"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ModalButtons from "@/components/ui/modal-buttons";
import { deleteOverride } from "../../actions";
import { SelectOverride } from "@/db/schema";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CenterDivs from "@/components/ui/center-divs";
import { convertToAmPm, queryKeys } from "@/lib/utils";
import { queryClient } from "@/app/react-query-client-provider";

type Props = { override: SelectOverride };

const DeleteOverride = ({ override }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const closeDialog = () => setOpen(false);

  const form = useForm();

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await deleteOverride({
        doctorId: override.doctorId,
        id: override.id,
      });

      if (res.success) {
        toast.success(res.message);

        queryClient.invalidateQueries({ queryKey: [queryKeys.overrides] });

        closeDialog();
      } else toast.error(res.message);
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className="p-2 h-8 hide-ring justify-between w-full"
              >
                Delete
                <Trash2 className="w-4 h-4" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Delete Override</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Override</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-6 capitalize"
          >
            <p className="text-center">
              Are you sure you want to delete this override
            </p>

            <br />
            <br />

            <CenterDivs label="Start Date:" value={override.startDate} />
            <CenterDivs
              label="start Time:"
              value={convertToAmPm(override.startTime)}
            />
            <CenterDivs label="End Date:" value={override.endDate} />
            <CenterDivs
              label="End Time:"
              value={convertToAmPm(override.endTime)}
            />
            <CenterDivs label="Reason:" value={override.reason} />

            <br />

            <ModalButtons
              className="justify-center"
              isLoading={isLoading}
              saveText="Yes"
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteOverride;
