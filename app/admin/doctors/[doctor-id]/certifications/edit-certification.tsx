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
import { editCertification } from "../../actions";
import { z } from "zod";
import { AddCertificationSchema } from "../../zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { queryClient } from "@/app/react-query-client-provider";
import { SelectCertification } from "@/db/schema";

type Props = { certification: SelectCertification };

const EditCertification = ({ certification }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const closeDialog = () => setOpen(false);

  const form = useForm<z.infer<typeof AddCertificationSchema>>({
    resolver: zodResolver(AddCertificationSchema),
    defaultValues: {
      doctorId: certification.doctorId,
      certificateFile: certification.certificateFile || "",
      certificationName: certification.certificationName,
      dateIssued: certification.dateIssued,
      expiryDate: certification.expiryDate || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof AddCertificationSchema>) => {
    setIsLoading(true);
    try {
      const res = await editCertification({ ...certification, ...values });

      if (res.success) {
        toast.success(res.message);

        queryClient.invalidateQueries({ queryKey: ["certifications"] });

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
          <DialogTitle>Edit Certification</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-6 capitalize"
          >
            <FormField
              control={form.control}
              name="certificationName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Certification Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateIssued"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date Issued</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="certificateFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Certification File</FormLabel>
                  <FormControl>
                    <Input type="file" {...field} />
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

export default EditCertification;
