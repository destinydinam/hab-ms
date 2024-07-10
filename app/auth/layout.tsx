import { validateRequest } from "@/auth";
import { urls } from "@/lib/utils";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type Props = { children: ReactNode };

const AuthLayout = async (props: Props) => {
  const { user } = await validateRequest();

  if (user) return redirect(urls.admin.doctors);

  return (
    <div className="flex items-center justify-center px-4 min-h-screen my-10">
      {props.children}
    </div>
  );
};

export default AuthLayout;
