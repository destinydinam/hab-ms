import { ReactNode } from "react";

type Props = { children: ReactNode };

const AuthLayout = async (props: Props) => {
  return (
    <div className="flex items-center justify-center px-4 min-h-screen my-10">
      {props.children}
    </div>
  );
};

export default AuthLayout;
