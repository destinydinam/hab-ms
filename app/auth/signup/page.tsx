import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardFooter,
  Card,
} from "@/components/ui/card";
import Link from "next/link";
import SignupForm from "./signupform";

const SignupPage = async () => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">
          Sign Up For Your Hospital
        </CardTitle>
        <CardDescription>
          Enter Hospital details to create an account.
        </CardDescription>
      </CardHeader>
      <SignupForm />
      <CardFooter className="text-center">
        Already have an account?
        <Link
          className="font-medium ml-1 text-primary-500 hover:underline"
          href="/auth/signin"
        >
          Sign In
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SignupPage;
