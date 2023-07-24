"use client";

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
import Image from "next/image";

// 2. Define a submit handler.
async function onSubmit(values: LoginFormType) {
  console.log(values);
  signIn("credentials", values);
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

  return (
    <div className="h-screen w-full bg-black">
      <Image
        src="assets/logo-dark.svg"
        alt="Placement Cell"
        width={10}
        height={10}
      />
      <Card className="mx-auto my-10 w-[400px] items-center justify-center py-5 align-middle md:w-[500px]">
        <CardHeader className="mx-auto items-center justify-items-center">
          <CardTitle className="text-xl">Login</CardTitle>
          <CardDescription>Sign in to your respective account</CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="grid grid-cols-1 gap-6">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select defaultValue={field.value}>
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
              <Button type="submit" className="m-auto w-1/3">
                Login
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default StudentLoginPage;
