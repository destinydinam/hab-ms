"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, CirclePlus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { AddDoctorSchema } from "./zod-schema";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ModalButtons from "@/components/ui/modal-buttons";
import { createDoctor } from "./actions";

const AddDoctor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const closeDialog = () => setOpen(false);

  const form = useForm<z.infer<typeof AddDoctorSchema>>({
    resolver: zodResolver(AddDoctorSchema),
  });

  const onSubmit = async (values: z.infer<typeof AddDoctorSchema>) => {
    setIsLoading(true);
    try {
      const res = await createDoctor(values);
      if (res.success) {
        toast.success(res.message);

        form.reset({
          email: "",
          dateOfBirth: "",
          doctorType: "",
          endDate: "",
          endTime: "",
          firstName: "",
          hireDate: "",
          lastName: "",
          otherNames: "",
          phoneNumber: "",
          startDate: "",
          startTime: "",
          status: "active",
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
          variant="outline"
          disabled={isLoading}
          className="border w-full gap-5 justify-start border-gray-400 hover:bg-black hover:text-white font-medium hover:shadow-xl transition-all duration-300 ease-in-out rounded-md text-xs px-4 md:gap-3"
        >
          <CirclePlus className="w-4 h-4" /> Add Doctor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] md:px-10 max-h-[90vh] overflow-y-auto">
        <h3 className="font-semibold text-2xl">Add Doctor</h3>
        <p className="mt-3 text-gray-400 text-xs">
          enter doctor details and click save
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-6"
          >
            <h2 className="font-semibold text-lg">Personal Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Dr" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="otherNames"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Other Names</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <PhoneInput
                        international
                        countryCallingCodeEditable={false}
                        placeholder="200000000"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <br />
            <br />
            <h2 className="font-semibold text-lg">Work Details</h2>

            <div className="grid grid-cols-1 items-end md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="hireDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hire Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
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

              <div>
                <p className="font-semibold ">Working Hours</p>
                <br />
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="doctorType"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Doctor Type</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? doctorTypes.find(
                                  (doctorType) => doctorType === field?.value
                                )
                              : "Select doctor type"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search doctor type..." />
                          <CommandList>
                            <CommandEmpty>No doctor type found.</CommandEmpty>
                            <CommandGroup heading="Doctors">
                              {doctorTypes.map((doctorType, i) => (
                                <CommandItem
                                  value={doctorType}
                                  key={i}
                                  onSelect={() => {
                                    form.setValue("doctorType", doctorType);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      doctorType === field?.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {doctorType}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">active</SelectItem>
                        <SelectItem value="inactive">inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <br />

            <ModalButtons isLoading={isLoading} />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDoctor;

export const doctorTypes = [
  "Others",
  "Anesthesiologist",
  "Cardiologist",
  "Dermatologist",
  "Endocrinologist",
  "Gastroenterologist",
  "General Practitioner (GP)",
  "Gynecologist",
  "Hematologist",
  "Infectious Disease Specialist",
  "Internist",
  "Nephrologist",
  "Neurologist",
  "Obstetrician",
  "Oncologist",
  "Ophthalmologist",
  "Orthopedic Surgeon",
  "Otolaryngologist (ENT)",
  "Pediatrician",
  "Psychiatrist",
  "Pulmonologist",
  "Radiologist",
  "Rheumatologist",
  "Surgeon",
  "Urologist",
];
