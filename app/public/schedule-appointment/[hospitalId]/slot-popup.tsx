import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import ModalButtons from "@/components/ui/modal-buttons";
import { ScheduleSlot } from "@/types/type";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  closeDialog: () => void;
  slot: ScheduleSlot;
};

const SlotPopup = ({ open, setOpen, closeDialog, slot }: Props) => {
  const form = useForm({});

  const onSubmit = async (values: any) => {};

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[900px] md:px-10 max-h-[90vh] overflow-y-auto">
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
            <ModalButtons isLoading={false} />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SlotPopup;
