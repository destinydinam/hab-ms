import { validateRequest } from "@/auth";
import { appName, urls } from "@/lib/utils";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Hospital - " + appName,
  description: "A Hospital Appointment Booking and Management System",
};

type Props = { children: ReactNode };

const Layout = async (props: Props) => {
  const { user } = await validateRequest();
  if (!user) return redirect(urls.signin);

  return <div>Layout</div>;
};

export default Layout;
