import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { SelectOverride } from "@/db/schema";
import { convertToAmPm } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import DeleteOverride from "./delete-override";
import ViewMore from "./view-more ";

type Props = { override: SelectOverride; index: number };

const OverrideRow = ({ override, index }: Props) => {
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{override.startDate}</TableCell>
      <TableCell>
        {!override.startTime || convertToAmPm(override.startTime)}
      </TableCell>
      <TableCell>{override.endDate}</TableCell>
      <TableCell>
        {!override.endTime || convertToAmPm(override.endTime)}
      </TableCell>
      <TableCell>{override.reason}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <ViewMore override={override} />
            <DeleteOverride override={override} />
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default OverrideRow;
