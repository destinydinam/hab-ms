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
import { deleteCertification } from "../../actions";
import { SelectCertification } from "@/db/schema";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CenterDivs from "@/components/ui/center-divs";
import { queryKeys } from "@/lib/utils";
import { queryClient } from "@/app/react-query-client-provider";

type Props = { certification: SelectCertification };

const DeleteCertification = ({ certification }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const closeDialog = () => setOpen(false);

  const form = useForm();

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await deleteCertification({
        doctorId: certification.doctorId,
        id: certification.id,
      });

      if (res.success) {
        toast.success(res.message);

        queryClient.invalidateQueries({ queryKey: [queryKeys.certifications] });

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

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Certification</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-6 capitalize"
          >
            <p className="text-center">
              Are you sure you want to delete this Certification
            </p>

            <br />
            <br />

            <CenterDivs
              label="Certification Name:"
              value={certification.certificationName}
            />
            <CenterDivs label="Date Issued:" value={certification.dateIssued} />
            <CenterDivs label="Expiry Date:" value={certification.expiryDate} />
            <CenterDivs
              label="Certificate File:"
              value={certification.certificateFile}
            />

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

export default DeleteCertification;
