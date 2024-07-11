import { ReactNode } from "react";

type Props = { label: string | ReactNode; value: string | ReactNode };

const CenterDivs = ({ label, value }: Props) => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="font-semibold col-span-4">{label}</div>
      <div className="col-span-8">{value}</div>
    </div>
  );
};

export default CenterDivs;
