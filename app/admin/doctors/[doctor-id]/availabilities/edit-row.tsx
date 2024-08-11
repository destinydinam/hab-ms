import { Dispatch, SetStateAction, useState } from "react";
import { EditAvailabilitySchema } from "../../zod-schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectWeeklyAvailabilities } from "@/db/schema";
import { editWeeklyAvailability } from "../../actions";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Check, Minus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  availabilitiesDay: SelectWeeklyAvailabilities;
  setEdit: Dispatch<SetStateAction<boolean>>;
};

const EditRow = ({ availabilitiesDay, setEdit }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof EditAvailabilitySchema>>({
    resolver: zodResolver(EditAvailabilitySchema),
    defaultValues: {
      id: availabilitiesDay.id,
      startTime: availabilitiesDay.startTime,
      endTime: availabilitiesDay.endTime,
    },
  });

  const onSubmit = async (values: z.infer<typeof EditAvailabilitySchema>) => {
    setIsLoading(true);
    try {
      const res = await editWeeklyAvailability(values);

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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid text-[10px] md:text-sm grid-cols-12 w-full gap-2">
          <div className="col-span-8 md:col-span-9 w-full items-center flex gap-1 md:gap-2 whitespace-nowrap h-fit">
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="time"
                      {...field}
                      className="h-7 md:h-8 text-[10px] md:text-sm px-1 border-gray rounded"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Minus className="w-2 md:w-3 h-4 min-w-2 md:min-w-3 min-h-4" />

            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="time"
                      {...field}
                      className="h-7 md:h-8 text-[10px] md:text-sm px-1 border-gray rounded"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-4 md:col-span-3 flex gap-1 md:gap-3 px-1 md:px-0 items-center justify-end md:justify-start">
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    disabled={isLoading}
                    onClick={() => setEdit(true)}
                    size="sm"
                    variant="outline"
                    className="p-2 h-8 text-[9px] border-gray rounded"
                  >
                    <Check className="w-4 h-4" />
                    <span className="sr-only">Update</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Update</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    disabled={isLoading}
                    onClick={() => setEdit(false)}
                    size="sm"
                    variant="outline"
                    className="p-2 h-8 text-[9px]  border-gray rounded"
                  >
                    <X className="w-4 h-4" />
                    <span className="sr-only">Cancel</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Cancel</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EditRow;
