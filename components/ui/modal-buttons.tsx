import { Loader2Icon } from "lucide-react";
import { Skeleton } from "./skeleton";
import { Button } from "./button";
import { DialogClose } from "./dialog";
import { cn } from "@/lib/utils";

type Props = {
  isLoading: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  saveText?: string;
};

const ModalButtons = (props: Props) => {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-6 text-white",
        props.className
      )}
    >
      {props.isLoading ? (
        <>
          <Skeleton className="flex h-10 w-20 items-center justify-center border border-gray-400 bg-gray-300">
            <Loader2Icon className="animate-spin" />
          </Skeleton>

          <Skeleton className="flex h-10 w-20 items-center justify-center border border-gray-400 bg-gray-300">
            <Loader2Icon className="animate-spin" />
          </Skeleton>
        </>
      ) : (
        <>
          <Button
            disabled={props?.disabled}
            variant="outline"
            type="submit"
            onClick={() => {
              props?.onClick && props.onClick();
            }}
            className="bg-green-500 px-6 border hover:border-green-500 hover:bg-green-100"
          >
            {props.saveText || "Save"}
          </Button>

          <DialogClose asChild>
            <Button
              disabled={props?.disabled}
              variant="outline"
              className="bg-gray-500 border hover:border-gray-500 hover:bg-gray-200"
            >
              Cancel
            </Button>
          </DialogClose>
        </>
      )}
    </div>
  );
};

export default ModalButtons;
