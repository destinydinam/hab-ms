import { appName, urls } from "@/lib/utils";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import Navbar from "./navbar";
import { authUser } from "../auth/actions";
import { validateRequest } from "@/auth";

export const metadata: Metadata = {
  title: "Hospital - " + appName,
  description: "A Hospital Appointment Booking and Management System",
};

type Props = { children: ReactNode };

const Layout = async (props: Props) => {
  const { user } = await validateRequest();

  if (!user) return redirect(urls.signin);

  const userData = await authUser(user.id);

  return (
    <div>
      <Navbar hospitalName={userData?.hospitalName} />
      {props.children}
    </div>
  );
};

export default Layout;
