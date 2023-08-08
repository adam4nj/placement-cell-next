"use client";

import "@smastrom/react-rating/style.css";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { jobFeedbackSchema } from "@/lib/validators/feedback";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
import { toast } from "@/components/ui/use-toast";

import { Rating } from "@smastrom/react-rating";
import { sendJobFeedback } from "@/actions/user";
import { Suspense, useState } from "react";
import { Separator } from "../ui/separator";

export function JobFeedbackForm({
  userId,
  title,
  company,
  companyId,
}: {
  userId: string;
  title: string;
  company: string;
  companyId: string;
}) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof jobFeedbackSchema>>({
    resolver: zodResolver(jobFeedbackSchema),
    defaultValues: {
      job: title,
      to: company,
      feedback: "",
      rating: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof jobFeedbackSchema>) {
    setOpen(false);
    await sendJobFeedback(userId, companyId, values);
    toast({
      title: "Feedback Sent!",
      description: "Your feedback is successfully submitted.",
    });
    form.reset();
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Send Job Feedback</Button>
      </SheetTrigger>
      <SheetContent
        position="right"
        className="my-5 mr-5 h-fit w-[600px] rounded-lg border-l-2 border-black p-10"
      >
        <SheetHeader className="space-y-1">
          <SheetTitle className="font-bold">Job Feedback Form</SheetTitle>
          <SheetDescription>
            Send your feedback regarding this job
          </SheetDescription>
        </SheetHeader>
        <Separator className="my-5" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="job"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Regarding the Job</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="to"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Feedback</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your feedback here.."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Suspense fallback="Loading..">
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem className="w-[200px]">
                    <FormControl>
                      <Rating
                        value={field.value}
                        onChange={field.onChange}
                        visibleLabelId="rating_label"
                        onBlur={field.onBlur}
                      />
                    </FormControl>
                    <FormDescription>Rate your feedback</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Suspense>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
