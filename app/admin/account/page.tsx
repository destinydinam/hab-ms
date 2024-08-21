import { validateRequest } from "@/auth";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "./header";
import { urls } from "@/lib/utils";

type Props = {};

const AccountsPage = async (props: Props) => {
  const { user } = await validateRequest();

  return (
    <div className="max-w-screen-2xl mx-auto px-4 md:px-16">
      <h2 className="my-8 text-xl md:text-2xl font-semibold">Account</h2>

      <Card>
        <CardHeader>
          <CardTitle>Public Link</CardTitle>
          <CardDescription>
            Place this link on your website to direct users to your scheduling
            page
          </CardDescription>

          <br />
          <Header
            url={
              process.env.NEXT_PUBLIC_APP_URL +
              urls.public["schedule-appointment"] +
              "/" +
              user?.id
            }
          />
        </CardHeader>
      </Card>
    </div>
  );
};

export default AccountsPage;
