import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ResetPassword from "./reset-password";

export const metadata = {
  title: "Forgot Password",
  description: "Forgot Password Page",
};

const ResetPasswordPage = async () => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Forgot password?</CardTitle>
        <CardDescription>
          Password reset link will be sent to your email.
        </CardDescription>
      </CardHeader>

      <ResetPassword />
    </Card>
  );
};

export default ResetPasswordPage;
