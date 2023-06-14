"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { jobSchema, Job } from "@/lib/validators/job";
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

async function onSubmit(values: Job) {
  console.log(values);
  await createJob(values);
}

export default function JobForm() {
  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      location: "",
      details: "",
      salary: 0,
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
