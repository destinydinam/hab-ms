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
import { SigninSchema } from "@/app/zodSchema";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "../actions";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { urls } from "@/lib/utils";

const SigninForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
  });

  const onSubmit = async (values: z.infer<typeof SigninSchema>) => {
    setIsLoading(true);
    try {
      const res = await signIn(values);
      if (res.success) {
        if (res.message) {
          toast.success(res.message);

          form.reset({ email: "" });
        } else {
        }
      } else toast.error(res.message);
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Sign In</CardTitle>

        <CardDescription>
          Enter your <strong>email </strong>
          and <strong> password </strong> click continue.
        </CardDescription>
      </CardHeader>

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
                    <Input
                      type="email"
                      placeholder="Email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <div className="flex items-center justify-between">
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Link
                      className="ml-1 underline text-xs text-primary-500 hover:underline"
                      href={urls["reset-password"]}
                    >
                      Reset Password
                    </Link>
                  </div>
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
                    className="absolute right-2 top-6 scale-75"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
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
              <Button size="sm" type="submit" className="w-full">
                Sign In
              </Button>
            )}
          </CardContent>
        </form>
      </Form>
    </>
  );
};

export default SigninForm;
