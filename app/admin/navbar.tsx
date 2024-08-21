"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, urls } from "@/lib/utils";
import { Calendar, LogOut, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "../auth/actions";
import { FaUserDoctor } from "react-icons/fa6";

type Props = { hospitalName: string };

const Navbar = (props: Props) => {
  const pathname = usePathname();

  return (
    <nav className="w-full border-b py-2 px-4 border-gray-400 bg-glass">
      <div className="max-w-7xl flex items-center justify-between mx-auto">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href={urls.admin.doctors}>
            <Image
              alt="logo"
              src="/logo.png"
              width={1000}
              height={1000}
              priority
              className="w-16"
            />
          </Link>

          <div className="hidden md:flex items-center gap-4 md:gap-6">
            {navlinks.map((link) => (
              <Link
                key={link.name}
                href={link.url}
                className={cn(
                  "inline-block font-medium",
                  pathname === link.url
                    ? "text-black"
                    : "text-gray-500 hover:text-black hover:underline"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <p className="font-semibold tracking-wide">{props.hospitalName}</p>

          <DropdownMenu dir="ltr">
            <DropdownMenuTrigger>
              <Avatar className="border border-gray-400">
                <AvatarImage alt="@userpic" />
                <AvatarFallback className="capitalize font-semibold">
                  {props.hospitalName[0].charAt(0)}{" "}
                  {props.hospitalName[0].charAt(1)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link href={urls.admin.doctors}>
                <DropdownMenuItem
                  className={cn(
                    "h-10 cursor-pointer hover:text-black",
                    pathname === urls.admin.doctors
                      ? "text-black"
                      : "text-gray-500"
                  )}
                >
                  <FaUserDoctor className="mr-2 h-4 w-4" />
                  Doctors
                </DropdownMenuItem>
              </Link>

              <Link href={urls.admin.schedules}>
                <DropdownMenuItem
                  className={cn(
                    "h-10 cursor-pointer hover:text-black",
                    pathname === urls.admin.schedules
                      ? "text-black"
                      : "text-gray-500"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule
                </DropdownMenuItem>
              </Link>

              <Link href={urls.admin.account}>
                <DropdownMenuItem
                  className={cn(
                    "h-10 cursor-pointer hover:text-black",
                    pathname === urls.admin.account
                      ? "text-black"
                      : "text-gray-500"
                  )}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Account
                </DropdownMenuItem>
              </Link>

              <DropdownMenuItem
                className={cn(
                  "h-10 cursor-pointer hover:text-black text-gray-500"
                )}
                onClick={async () => await signOut()}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

const navlinks = [
  { name: "Doctors", url: urls.admin.doctors },
  { name: "Schedules", url: urls.admin.schedules },
  { name: "Account", url: urls.admin.account },
];
