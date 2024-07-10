import { urls } from "@/lib/utils";
import { redirect } from "next/navigation";

type Props = {};

const AdminPage = async (props: Props) => {
  redirect(urls.admin.doctors);
};

export default AdminPage;
