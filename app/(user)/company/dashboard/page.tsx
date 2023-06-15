"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { jobSchema, Job, NewJob, newJobSchema } from "@/lib/validators/job";
import { z } from "zod";

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
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { createJob } from "@/actions/jobs";

async function onSubmit(values: NewJob) {
  console.log(values);
  await createJob(values);
}

export default function JobForm() {
  const form = useForm<NewJob>({
    resolver: zodResolver(newJobSchema),
    defaultValues: {
      title: "",
      location: "",
      salary: 0,
      details: "",
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Job Creation Form </h3>
        <p className="text-sm text-muted-foreground">
          Submit your new jobs here
        </p>
      </div>
      <div className="container">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-5 grid grid-cols-2 gap-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input
                      className="flex"
                      placeholder="Your Title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Location</FormLabel>
                  <FormControl>
                    <Input className="flex" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter expected salary"
                      className="flex"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Details</FormLabel>
                  <FormControl>
                    <Textarea
                      className="flex"
                      placeholder="Add a description.."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="items-center justify-center"
              onClick={() => form.reset}
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
