import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ResetNewPassword from "./reset-new-password";

export const metadata = {
  title: "Reset Password",
  description: "Reset Password Page",
};

const ResetNewPasswordTokenPage = async ({
  params,
}: {
  params: { token: string };
}) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Reset password</CardTitle>
        <CardDescription>Enter new password.</CardDescription>
      </CardHeader>

      <ResetNewPassword token={params.token} />
    </Card>
  );
};

export default ResetNewPasswordTokenPage;
