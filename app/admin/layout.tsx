import { appName, urls } from "@/lib/utils";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import Navbar from "./navbar";
import { authUser } from "../auth/actions";

export const metadata: Metadata = {
  title: "Hospital - " + appName,
  description: "A Hospital Appointment Booking and Management System",
};

type Props = { children: ReactNode };

const Layout = async (props: Props) => {
  const user = await authUser();
  if (!user) return redirect(urls.signin);

  return (
    <div>
      <Navbar hospitalName={user.hospitalName} />
      {props.children}
    </div>
  );
};

export default Layout;
