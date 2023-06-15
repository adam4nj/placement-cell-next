"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";

import { signIn } from "next-auth/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema, LoginFormType } from "@/lib/validators/auth";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Router, useRouter } from "next/router";

const router = useRouter();

// 2. Define a submit handler.
async function onSubmit(values: LoginFormType) {
  console.log(values);
  signIn("credentials", values);
  router.push("/");
}

const StudentLoginPage = () => {
  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      role: "STUDENT",
      username: "",
      password: "",
    },
  });

  const { pending } = useFormStatus();

  return (
    <Card className="w-[400px] md:w-[500px] m-auto py-5 items-center justify-center align-middle">
      <CardHeader className="mx-auto items-center justify-items-center">
        <CardTitle className="text-xl">Login</CardTitle>
        <CardDescription>Sign up for an student account</CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-6 grid-cols-1">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="STUDENT">Student</SelectItem>
                      <SelectItem value="COMPANY">Company</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      className="flex"
                      placeholder="Your Username"
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
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="flex"
                      placeholder="Your Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className={pending ? "bg-slate-500 w-1/3 m-auto" : "w-1/3 m-auto"}
              disabled={pending}
            >
              Login
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default StudentLoginPage;
