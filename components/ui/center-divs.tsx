import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  label: string | ReactNode;
  value: string | ReactNode;
  className1?: string;
  className2?: string;
};

const CenterDivs = ({ label, value, className1, className2 }: Props) => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className={cn("font-semibold col-span-4", className1)}>{label}</div>
      <div className={cn("col-span-8", className2)}>{value}</div>
    </div>
  );
};

export default CenterDivs;
