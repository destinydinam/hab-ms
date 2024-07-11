"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = { doctorId: string };

const TabLinks = (props: Props) => {
  const pathname = usePathname();

  return (
    <>
      <div className="hidden h-fit md:grid grid-flow-col gap-2 bg-gray-300 p-1 rounded-md font-medium">
        {tablinks(props.doctorId).map((tab, i) => (
          <Link
            key={i}
            href={tab.url}
            className={cn(
              "whitespace-nowrap px-4 py-1 rounded-sm",
              tab.url === pathname ? "bg-white" : ""
            )}
          >
            {tab.name}
          </Link>
        ))}
      </div>

      <div className="inline md:hidden h-fit">
        <DropdownMenu dir="ltr">
          <DropdownMenuTrigger className="flex gap-5 border rounded-md px-4 py-2 border-gray-300">
            {/* <Button size="sm" variant="outline" className="h-8 border px- gap-4"> */}
            {tablinks(props.doctorId).find((t) => t.url === pathname)?.name}
            <ChevronsUpDown className="h-4 w-4" />
            {/* </Button> */}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {tablinks(props.doctorId).map((tab, i) => (
              <Link key={i} href={tab.url}>
                <DropdownMenuItem
                  className={cn(
                    "h-10 cursor-pointer hover:text-black",
                    tab.url === pathname ? "text-black" : "text-gray-500"
                  )}
                >
                  {tab.name}
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default TabLinks;

const tablinks = (id: string) => [
  { name: "Profile", url: "/admin/doctors/" + id },
  { name: "Availabilities", url: "/admin/doctors/" + id + "/availabilities" },
  { name: "Certifications", url: "/admin/doctors/" + id + "/certifications" },
  { name: "Work Experience", url: "/admin/doctors/" + id + "/work-experience" },
  { name: "Appointments", url: "/admin/doctors/" + id + "/appointments" },
];
