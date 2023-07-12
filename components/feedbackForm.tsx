"use client";

import "@smastrom/react-rating/style.css";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { feedbackSchema } from "@/lib/validators/feedback";

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
import { Textarea } from "./ui/textarea";
import { toast } from "./ui/use-toast";

import { Rating } from "@smastrom/react-rating";
import { sendFeedback } from "@/actions/user";
import { Suspense } from "react";

export function FeedbackForm({ userId }: { userId: string }) {
  const form = useForm<z.infer<typeof feedbackSchema>>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      subject: "",
      feedback: "",
      rating: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof feedbackSchema>) {
    console.log(values);
    await sendFeedback(userId, values);
    toast({
      title: "Feedback Sent!",
      description: "Your feedback is successfully submitted.",
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input {...field} />
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
                <Textarea placeholder="Enter your feedback here.." {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
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
  );
}
