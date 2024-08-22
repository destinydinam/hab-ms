import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ModalButtons from "@/components/ui/modal-buttons";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SelectAppointmentFormFields } from "@/db/schema";
import { ScheduleSlot } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "sonner";
import { z } from "zod";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  closeDialog: () => void;
  slot: ScheduleSlot;
  hospitalId: string;
  appointmentFormFields: SelectAppointmentFormFields[];
};

const SlotPopup = ({
  open,
  setOpen,
  closeDialog,
  slot,
  hospitalId,
  appointmentFormFields,
}: Props) => {
  const FormSchema = createZodSchema(appointmentFormFields);

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    try {
      const res = await { success: true, message: "success" };

      if (res.success) {
        toast.success(res.message);
      } else toast.error(res.message);
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px] md:px-10 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule Details</DialogTitle>
          <DialogDescription className="mt-3 text-gray-400 text-xs">
            enter schedule details and click enter to book an appointment
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-6"
          >
            {appointmentFormFields.map((formField, i) => (
              <div key={i}>
                <FormField
                  control={form.control}
                  name={formField.inputName}
                  render={({ field }) =>
                    formField.inputType === "phoneNumber" ? (
                      <FormItem>
                        <FormLabel>{formField.inputName}</FormLabel>{" "}
                        <FormControl>
                          <PhoneInput
                            international
                            countryCallingCodeEditable={false}
                            placeholder={formField.placeholder}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    ) : formField.inputType === "textarea" ? (
                      <FormItem>
                        <FormLabel>{formField.inputName}</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder={formField.placeholder}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    ) : formField.inputType === "select" ? (
                      <FormItem>
                        <FormLabel>{formField.inputName}</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={formField.placeholder}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {(
                              JSON.parse(
                                (formField.selectData as string) || "[]"
                              ) as string[]
                            )?.map((item, i) => (
                              <SelectItem key={i} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    ) : (
                      <FormItem>
                        <FormLabel>{formField.inputName}</FormLabel>
                        <FormControl>
                          <Input
                            type={formField.inputType}
                            {...field}
                            placeholder={formField.placeholder}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }
                />
              </div>
            ))}

            <ModalButtons isLoading={isLoading} />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SlotPopup;

const createZodSchema = (fields: SelectAppointmentFormFields[]) => {
  const schemaShape: any = {};

  fields.forEach((field) => {
    let zodField;

    const message = { message: `${field.inputName} is required` };

    switch (field.inputType) {
      case "text":
        zodField = z.string();

        if (field.required === "yes") zodField = zodField.min(1, message);
        else zodField.optional().or(z.literal(""));

        break;

      case "email":
        zodField = z.string().email();

        if (field.required === "yes") zodField = zodField.min(1, message);
        else zodField.optional().or(z.literal(""));

        break;

      case "phoneNumber":
        zodField = z.string();

        if (field.required === "yes")
          zodField = zodField
            .min(1, message)
            .refine(isValidPhoneNumber, { message: "Invalid phone number" });
        else zodField.optional().or(z.literal(""));

        break;

      default:
        zodField = z.string();

        if (field.required === "yes") zodField = zodField.min(1, message);
        else zodField.optional().or(z.literal(""));

        break;
    }

    schemaShape[field.inputName] = zodField;
  });

  return z.object(schemaShape);
};
