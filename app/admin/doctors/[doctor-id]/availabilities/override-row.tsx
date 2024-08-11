import { TableCell, TableRow } from "@/components/ui/table";
import { InsertOverride } from "@/db/schema";
import { convertToAmPm } from "@/lib/utils";

type Props = { override: InsertOverride; index: number };

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
      <TableCell></TableCell>
    </TableRow>
  );
};

export default OverrideRow;
