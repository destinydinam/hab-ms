import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClockIcon } from "lucide-react";
import Link from "next/link";

const Verification = () => {
  return (
    <div className="flex h-full flex-1 items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <ClockIcon className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Account Created Successfully
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4 text-gray-600">
            Your account is undergoing verification. We will send you a
            confirmation email in the next 5 working hours.
          </p>
          <p className="mb-6 text-sm text-gray-500">
            Please contact us if you are still seeing this after 5 hours without
            a confirmation email from us.
          </p>
          <Link href="mailto:destinydinam1@gmail.com">
            <Button className="w-full">Contact Support</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default Verification;
