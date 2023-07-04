"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
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
  studentProfileSchema,
  StudentProfileType,
} from "@/lib/validators/profile";
import { editProfile, StudentDBType } from "@/actions/jobs";
import { useMutation } from "@tanstack/react-query";

// 2. Define a submit handler.
async function onSubmit(values: StudentProfileType) {
  editProfile(values);
}

const StudentProfileForm = ({ student }: { student: StudentDBType }) => {
  const form = useForm<StudentProfileType>({
    resolver: zodResolver(studentProfileSchema),
    defaultValues: {
      fName: student.fName,
      lName: student.lName!,
      email: student.email,
      address: student.address!,
      district: student.district!,
      state: student.state!,
      phone: student.phone!,
      pin: student.pin!,
    },
  });

  const { pending } = useFormStatus();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full space-y-8 mx-auto justify-between"
      >
        <div className="grid grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="fName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
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
            name="lName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    className="flex"
                    placeholder="Your Last Name"
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input className="flex" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
        <div className="grid grid-cols-3 gap-4">
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
        </div>
        <div className="flex flex-row justify-between">
          <Button variant="destructive">Cancel Changes</Button>
          <Button
            type="submit"
            className={pending ? "bg-slate-500 w-1/3" : "w-1/3"}
            disabled={pending}
          >
            Update Profile
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default StudentProfileForm;
