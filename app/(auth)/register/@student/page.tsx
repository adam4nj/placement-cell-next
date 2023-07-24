"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";

import { signIn, useSession } from "next-auth/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema, RegisterFormType } from "@/lib/validators/auth";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

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

const StudentRegisterPage = () => {
  const { mutate: registerStudent } = useMutation({
    mutationFn: async ({
      name,
      role,
      email,
      phone,
      username,
      password,
      confirmPassword,
    }: RegisterFormType) => {
      const payload: RegisterFormType = {
        name,
        role,
        email,
        phone,
        username,
        password,
        confirmPassword,
      };
      const { data } = await axios.post("/api/register/student", payload);
      return data;
    },
  });
  const form = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      role: "STUDENT",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: RegisterFormType) {
    console.log(values);
    registerStudent(values);
    signIn();
  }

  const { data: session, status } = useSession();
  const { pending } = useFormStatus();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push(`/dashboard/${session.user.role.toLowerCase()}`);
    }
  }, [status]);

  return (
    <Card className="m-auto w-[400px] items-center justify-center py-5 align-middle md:w-[800px]">
      <CardHeader className="mx-auto items-center justify-items-center">
        <CardTitle className="text-xl">Register</CardTitle>
        <CardDescription>Sign up for an student account</CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      className="flex"
                      placeholder="Your Name"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Enter your full name.</FormDescription>
                  <FormMessage />
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
                  <FormDescription>
                    This is your school registration id.
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="flex"
                      placeholder="Your Email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public email id.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      className="flex"
                      placeholder="Your Phone Number"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>This is your phone number.</FormDescription>
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
                    <Input
                      className="flex"
                      placeholder="Confirm Password"
                      {...field}
                    />
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
              className={pending ? "m-auto w-1/3 bg-slate-500" : "m-auto w-1/3"}
              disabled={pending}
            >
              Submit
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default StudentRegisterPage;
