import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { SelectAppointmentFormFields } from "@/db/schema";
import { MoreHorizontal } from "lucide-react";
import ViewMore from "./view-more ";
import DeleteAppointmentFormFields from "./delete-appointment-form-fields";
import { defaultFormFields } from "@/lib/utils";

type Props = {
  index: number;
  formField: SelectAppointmentFormFields;
};

const AppointmentFormFieldsRow = ({ formField, index }: Props) => {
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{formField.inputName}</TableCell>
      <TableCell>{formField.inputType}</TableCell>
      <TableCell>{formField.required}</TableCell>
      <TableCell>{formField.placeholder}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <ViewMore formField={formField} />
            {!(
              formField.inputName === defaultFormFields[0].inputName ||
              formField.inputName === defaultFormFields[1].inputName ||
              formField.inputName === defaultFormFields[2].inputName
            ) && <DeleteAppointmentFormFields formField={formField} />}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default AppointmentFormFieldsRow;
