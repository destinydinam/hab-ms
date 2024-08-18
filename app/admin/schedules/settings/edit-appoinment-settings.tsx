"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ModalButtons from "@/components/ui/modal-buttons";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { queryClient } from "@/app/react-query-client-provider";
import { SelectAppointmentSettings } from "@/db/schema";
import { AppointmentSettingsSchema } from "../zod-schema";
import { editAppointmentSettings } from "../actions";
import { durations, noYes, queryKeys } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = { appointmentSettings: SelectAppointmentSettings };

const EditAppointmentSettings = ({ appointmentSettings }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const closeDialog = () => setOpen(false);

  const form = useForm<z.infer<typeof AppointmentSettingsSchema>>({
    resolver: zodResolver(AppointmentSettingsSchema),
    defaultValues: {
      duration: appointmentSettings.duration,
      bufferTime: appointmentSettings.bufferTime,
      paymentBeforeBooking: appointmentSettings.paymentBeforeBooking,
      showDoctorName: appointmentSettings.showDoctorName,
    },
  });

  const onSubmit = async (
    values: z.infer<typeof AppointmentSettingsSchema>
  ) => {
    setIsLoading(true);
    try {
      const res = await editAppointmentSettings({
        ...appointmentSettings,
        ...values,
      });

      if (res.success) {
        toast.success(res.message);

        queryClient.invalidateQueries({
          queryKey: [queryKeys["appointments-settings"]],
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
          <Pencil className="w-4 h-4" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Appointment Settings</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-6 capitalize"
          >
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {durations.map((duration, i) => (
                        <SelectItem key={i} value={duration.value.toString()}>
                          {duration.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bufferTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Buffer Time</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select buffer time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {durations.map((duration, i) => (
                        <SelectItem key={i} value={duration.value.toString()}>
                          {duration.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentBeforeBooking"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Before Booking</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {noYes.map((item, i) => (
                        <SelectItem key={i} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="showDoctorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Show Doctor Name</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {noYes.map((item, i) => (
                        <SelectItem key={i} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <br />

            <ModalButtons isLoading={isLoading} />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAppointmentSettings;
