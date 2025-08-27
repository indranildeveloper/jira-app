"use client";

import { FC } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import {
  signUpFormSchema,
  signUpFormValidator,
} from "@/validators/auth/signUpFormValidator";
import { useRegister } from "@/features/auth/api/useRegister";

const RegisterCard: FC = () => {
  const { mutate, isPending } = useRegister();

  const form = useForm<signUpFormValidator>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSignUp = (values: signUpFormValidator) => {
    mutate({ json: values });
  };

  return (
    <Card className="h-full w-full md:w-[500px]">
      <CardHeader className="flex flex-col items-center justify-center text-center">
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>
          By signing up you agree to our{" "}
          <Link href="/privacy">
            <span className="text-blue-600">Privacy Policy</span>
          </Link>{" "}
          and{" "}
          <Link href="/terms">
            <span className="text-blue-600">Terms of Service</span>
          </Link>
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <Separator />
      </div>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleSignUp)}
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      placeholder="Enter password"
                      min={8}
                      max={256}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              Register
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <Separator />
      </div>
      <CardContent className="flex flex-col gap-y-4">
        <Button variant="secondary" className="w-full" disabled={isPending}>
          <FcGoogle className="mr-2 size-5" /> Login with Google
        </Button>
        <Button variant="secondary" className="w-full" disabled={isPending}>
          <FaGithub className="mr-2 size-5" /> Login with GitHub
        </Button>
      </CardContent>
      <div className="px-7">
        <Separator />
      </div>
      <CardContent className="flex items-center justify-center">
        <p>
          Already have an account?&nbsp;
          <Link href="/login">
            <span className="text-blue-600">Log In</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default RegisterCard;
