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
import { editWorkExperience } from "../../actions";
import { z } from "zod";
import { AddWorkExperienceSchema } from "../../zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { queryClient } from "@/app/react-query-client-provider";
import { SelectWorkExperience } from "@/db/schema";
import { queryKeys } from "@/lib/utils";

type Props = { workExperience: SelectWorkExperience };

const EditWorkExperience = ({ workExperience }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const closeDialog = () => setOpen(false);

  const form = useForm<z.infer<typeof AddWorkExperienceSchema>>({
    resolver: zodResolver(AddWorkExperienceSchema),
    defaultValues: {
      doctorId: workExperience.doctorId,
      companyName: workExperience.companyName,
      jobTitle: workExperience.jobTitle,
      startDate: workExperience.startDate || "",
      endDate: workExperience.endDate || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof AddWorkExperienceSchema>) => {
    setIsLoading(true);
    try {
      const res = await editWorkExperience({ ...workExperience, ...values });

      if (res.success) {
        toast.success(res.message);

        queryClient.invalidateQueries({
          queryKey: [queryKeys["work-experience"]],
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
          Edit
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Work Experience</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-6 capitalize"
          >
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
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

export default EditWorkExperience;
