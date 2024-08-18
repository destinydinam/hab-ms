import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { SelectWorkExperience } from "@/db/schema";
import { MoreHorizontal } from "lucide-react";
import EditWorkExperience from "./edit-work-experience";
import DeleteWorkExperience from "./delete-work-experience";

type Props = { index: number; workExperience: SelectWorkExperience };

const WorkExperienceRow = ({ workExperience, index }: Props) => {
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{workExperience.companyName}</TableCell>
      <TableCell>{workExperience.jobTitle}</TableCell>
      <TableCell>{workExperience.startDate}</TableCell>
      <TableCell>{workExperience.endDate}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <EditWorkExperience workExperience={workExperience} />
            <DeleteWorkExperience workExperience={workExperience} />
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default WorkExperienceRow;
