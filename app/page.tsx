import { Button } from "@/components/ui/button";
import { urls } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-full mx-auto p-4">
      <Link href={urls.admin.doctors}>
        <Button>Go to Dashboard</Button>
      </Link>
    </div>
  );
}
