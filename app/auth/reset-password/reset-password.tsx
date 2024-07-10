"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { ResetPasswordSchema } from "@/app/zodSchema";
import { CardContent } from "@/components/ui/card";
import Link from "next/link";
import { toast } from "sonner";
import { sendPasswordResetLink } from "../actions";
import { Loader2Icon } from "lucide-react";

type Props = {};

const ResetPassword = ({}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const onSubmit = async (values: z.infer<typeof ResetPasswordSchema>) => {
    setIsLoading(true);
    try {
      const res = await sendPasswordResetLink(values);
      if (res.success) {
        toast.success(res.message);
        router.push("/");
      } else toast.error(res.message);
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CardContent className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <br />
          {isLoading ? (
            <Skeleton className="flex h-9 w-full items-center justify-center border border-gray-400 bg-gray-300">
              <Loader2Icon className="animate-spin" />
            </Skeleton>
          ) : (
            <Button type="submit" className="w-full">
              Reset Password
            </Button>
          )}

          <Link href={isLoading ? "#" : "/auth/signin"}>
            <Button variant="link" className="w-full bg-gray-100 mt-4">
              Cancel
            </Button>
          </Link>
        </CardContent>
      </form>
    </Form>
  );
};

export default ResetPassword;
