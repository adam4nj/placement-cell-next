"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";

import { signIn, useSession } from "next-auth/react";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterFormType, registerFormSchema } from "@/lib/validators/auth";

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
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

const CompanyRegisterPage = () => {
  const { mutate: registerCompany } = useMutation({
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
      const { data } = await axios.post("/api/register/company", payload);
      return data;
    },
  });

  async function onSubmit(values: RegisterFormType) {
    console.log(values);
    registerCompany(values);
    signIn();
  }
  const form = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      role: "COMPANY",
      phone: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { data: session, status } = useSession();
  const { pending } = useFormStatus();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push(`/dashboard/${session.user.role.toLowerCase()}`);
    }
  }, [status]);

  return (
    <div>
      <Card className="m-auto w-[400px] items-center justify-center py-5 align-middle md:w-[800px]">
        <CardHeader className="mx-auto items-center justify-items-center">
          <CardTitle className="text-xl">Register</CardTitle>
          <CardDescription>Sign up for an company account</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Username" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your companys username.
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Company Phone" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your companys phone number.
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
                  pending ? "m-auto w-1/3 bg-slate-500" : "m-auto w-1/3"
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
