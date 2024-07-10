import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import AddDoctor from "./add-doctor";

const DoctorsPage = async () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <br />
      <br />
      <h2 className="font-semibold text-xl">Doctors</h2>

      <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4" />
          <Input
            placeholder="Search..."
            className="pl-10 h-9 w-full md:w-60 rounded-md border border-gray-400"
          />
        </div>

        <div className="flex gap-4 items-center">
          {/* filter */}
          <AddDoctor />
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;
