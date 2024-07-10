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
import { ResetNewPasswordSchema } from "@/app/zodSchema";
import { CardContent } from "@/components/ui/card";
import { Eye, EyeOff, Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { resetPassword } from "../../actions";

type Props = { token: string };

const ResetNewPassword = ({ token }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof ResetNewPasswordSchema>>({
    resolver: zodResolver(ResetNewPasswordSchema),
  });

  const onSubmit = async (values: z.infer<typeof ResetNewPasswordSchema>) => {
    setIsLoading(true);
    try {
      const res = await resetPassword({ ...values, token });
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
            name="password"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel htmlFor="password">New Password</FormLabel>
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <FormMessage />

                <button
                  type="button"
                  className="absolute right-2 top-8 scale-75"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input
                    type={showPassword1 ? "text" : "password"}
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <FormMessage />

                <button
                  type="button"
                  className="absolute right-2 top-8 scale-75"
                  onClick={() => setShowPassword1(!showPassword1)}
                >
                  {showPassword1 ? <EyeOff /> : <Eye />}
                </button>
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
          <Button variant="outline" className="w-full bg-gray-100">
            Cancel
          </Button>
        </CardContent>
      </form>
    </Form>
  );
};

export default ResetNewPassword;
