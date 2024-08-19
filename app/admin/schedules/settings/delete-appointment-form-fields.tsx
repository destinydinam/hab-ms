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
import { SelectAppointmentFormFields } from "@/db/schema";
import CenterDivs from "@/components/ui/center-divs";
import { queryKeys } from "@/lib/utils";
import { deleteAppointmentFormFields } from "../actions";
import { queryClient } from "@/app/react-query-client-provider";

type Props = { formField: SelectAppointmentFormFields };

const DeleteAppointmentFormFields = ({ formField }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const closeDialog = () => setOpen(false);

  const form = useForm();

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await deleteAppointmentFormFields({
        id: formField.id,
        hospitalId: formField.hospitalId,
      });

      if (res.success) {
        toast.success(res.message);

        queryClient.invalidateQueries({
          queryKey: [queryKeys["appointment-form-fields"]],
        });

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
          <DialogTitle>Delete Appointment Form Fields</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-6 capitalize"
          >
            <p className="text-center">
              Are you sure you want to delete this field
            </p>

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

export default DeleteAppointmentFormFields;
