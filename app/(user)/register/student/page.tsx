"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerFormSchema,
  RegisterFormType,
} from "@/lib/validators/register";

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
import axios from "axios";

// 2. Define a submit handler.
async function onSubmit(values: RegisterFormType) {
  console.log(values);
  await axios
    .post("/api/register", values)
    .then(() => alert("User has been registered"))
    .catch(() => alert("An error has occurred"));
}

const StudentRegisterPage = () => {
  const form = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      role: "STUDENT",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });
  return (
    <div>
      <Card className="w-[400px] md:w-[800px] m-auto py-5 items-center justify-center align-middle">
        <CardHeader className="mx-auto items-center justify-items-center">
          <CardTitle className="text-xl">Register</CardTitle>
          <CardDescription>Sign up for an student account</CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="grid gap-6 grid-cols-1 md:grid-cols-2">
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
              <Button type="submit" className="w-1/3 m-auto">
                Submit
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default StudentRegisterPage;
