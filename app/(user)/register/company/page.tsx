"use client";

import { signIn, useSession } from "next-auth/react";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerFormSchema, RegisterFormType } from "@/lib/validators/auth";
import { registerCompanyAction } from "@/actions/user";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { experimental_useFormStatus as useFormStatus } from "react-dom";

// 2. Define a submit handler.
async function onSubmit(values: RegisterFormType) {
  console.log(values);
  await registerCompanyAction(values);
  signIn();
}

const CompanyRegisterPage = () => {
  const form = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      role: "COMPANY",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { status } = useSession();
  const { pending } = useFormStatus();

  useEffect(() => {
    if (status === "authenticated") {
      signIn();
    }
  }, [status]);

  return (
    <div>
      <Card className="w-[400px] md:w-[800px] m-auto py-5 items-center justify-center align-middle">
        <CardHeader className="mx-auto items-center justify-items-center">
          <CardTitle className="text-xl">Register</CardTitle>
          <CardDescription>Sign up for an company account</CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="grid gap-6 grid-cols-1 md:grid-cols-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Username" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your company's public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Work Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Work Email" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your organization's email id.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Password" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your super secret password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Confirm Password" {...field} />
                    </FormControl>
                    <FormDescription>
                      Repeat your super secret password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className={
                  pending
                    ? "bg-slate-500 w-1/3 m-auto"
                    : "bg-slate-900 w-1/3 m-auto"
                }
                disabled={pending}
              >
                Submit
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default CompanyRegisterPage;
