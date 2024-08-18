import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { SelectCertification } from "@/db/schema";
import { MoreHorizontal } from "lucide-react";
import DeleteCertification from "./delete-certification";
import EditCertification from "./edit-certification";

type Props = { index: number; certification: SelectCertification };

const CertificationRow = ({ certification, index }: Props) => {
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{certification.certificationName}</TableCell>
      <TableCell>{certification.dateIssued}</TableCell>
      <TableCell>{certification.expiryDate}</TableCell>
      <TableCell>{certification.certificateFile}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <EditCertification certification={certification} />
            <DeleteCertification certification={certification} />
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default CertificationRow;
