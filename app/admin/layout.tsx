import { appName, urls } from "@/lib/utils";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import Navbar from "./navbar";
import { authUser } from "../auth/actions";
import { validateRequest } from "@/auth";
import Verification from "@/components/app/verification";

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
    <div className="flex flex-col min-h-screen">
      <Navbar hospitalName={userData?.hospitalName} />
      {userData.isVerified ? props.children : <Verification />}
    </div>
  );
};

export default Layout;
