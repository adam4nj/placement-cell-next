"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const formSchema = z
  .object({
    role: z.enum(["STUDENT", "COMPANY"]),
    email: z
      .string()
      .email("Invalid Email")
      .min(1, { message: "Email is Required" }),
    username: z.string().min(8, {
      message: "Username must be at least 8 characters.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z
      .string()
      .min(1, { message: "Password confirmation is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "STUDENT",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Card className="w-[800px] m-auto py-5 items-center justify-center align-middle">
      <CardHeader className="mx-auto items-center justify-items-center">
        <CardTitle>Register</CardTitle>
        <CardDescription>Sign up for an account</CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs
          defaultValue="student"
          className="mx-20 items-center justify-center"
        >
          <TabsList className="flex w-[500px] m-auto items-center justify-center">
            <Link href="/api/login/student">
              <TabsTrigger className="py-auto px-10 mx-auto" value="student">
                For Students
              </TabsTrigger>
            </Link>
            <Link href="/api/login/">
              <TabsTrigger className="py-auto px-10 mx-auto" value="company">
                For Companies
              </TabsTrigger>
            </Link>
          </TabsList>
          <TabsContent value="student"></TabsContent>
          <TabsContent value="company">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-2 gap-6"
              >
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
                        This is your companys public display name.
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
                        This is your organizations email id.
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
                <Button type="submit" className="w-1/3 my-auto align-bottom">
                  Submit
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
