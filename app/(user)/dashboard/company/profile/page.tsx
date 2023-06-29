"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";

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
import { Textarea } from "@/components/ui/textarea";
import {
  companyProfileSchema,
  CompanyProfileType,
} from "@/lib/validators/profile";

// 2. Define a submit handler.
async function onSubmit(values: CompanyProfileType) {
  console.log(values);
}

const CompanyProfilePage = () => {
  const form = useForm<CompanyProfileType>({
    resolver: zodResolver(companyProfileSchema),
    defaultValues: {},
  });

  const { pending } = useFormStatus();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full space-y-8 mx-auto justify-between"
      >
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name of Organization</FormLabel>
              <FormControl>
                <Input
                  className="flex"
                  placeholder="Your First Name"
                  {...field}
                />
              </FormControl>
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
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Home Address</FormLabel>
              <FormControl>
                <Textarea
                  className="flex"
                  placeholder="Your Address.."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="district"
          render={({ field }) => (
            <FormItem>
              <FormLabel>District</FormLabel>
              <FormControl>
                <Input className="flex" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input className="flex" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PIN Code</FormLabel>
              <FormControl>
                <Input className="flex" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className={pending ? "bg-slate-500 w-2/3 m-auto" : "w-2/3 m-auto"}
          disabled={pending}
        >
          Update Changes
        </Button>
      </form>
    </Form>
  );
};

export default CompanyProfilePage;
