"use client";

import { FC } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useLogin } from "@/features/auth/api/useLogin";
import {
  signInFormSchema,
  signInFormValidator,
} from "@/validators/auth/signInFormValidator";

const LoginCard: FC = () => {
  const { mutate, isPending } = useLogin();

  const form = useForm<signInFormValidator>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = (values: signInFormValidator) => {
    mutate({ json: values });
  };

  return (
    <Card className="h-full w-full md:w-[500px]">
      <CardHeader className="flex items-center justify-center text-center">
        <CardTitle className="text-2xl">Welcome Back</CardTitle>
      </CardHeader>
      <div className="px-7">
        <Separator />
      </div>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleSignIn)}
          >
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      max={256}
                      min={8}
                      placeholder="Enter password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              Log In
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <Separator />
      </div>
      <CardContent className="flex flex-col gap-y-4">
        <Button className="w-full" disabled={isPending} variant="secondary">
          <FcGoogle className="mr-2 size-5" /> Login with Google
        </Button>
        <Button className="w-full" disabled={isPending} variant="secondary">
          <FaGithub className="mr-2 size-5" /> Login with GitHub
        </Button>
      </CardContent>
      <div className="px-7">
        <Separator />
      </div>
      <CardContent className="flex items-center justify-center">
        <p>
          Do not have an account?&nbsp;
          <Link href="/register">
            <span className="text-blue-600">Register</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default LoginCard;
