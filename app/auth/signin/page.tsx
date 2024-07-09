import { validateRequest } from "@/auth";
import SigninForm from "./signinform";
import { redirect } from "next/navigation";
import { CardFooter, Card } from "@/components/ui/card";
import Link from "next/link";
import { urls } from "@/lib/utils";

const SigninPage = async () => {
  const { user } = await validateRequest();

  if (user) return redirect("/");

  return (
    <Card className="w-full max-w-md">
      <SigninForm />
      <CardFooter className="text-center">
        Don&apos;t have an account?
        <Link
          className="font-medium ml-1 underline text-primary-500 hover:underline"
          href={urls.signup}
        >
          Create Account
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SigninPage;
