"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import {
  newNotificationSchema,
  NewNotification,
} from "@/lib/validators/notification";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

type addNotifProps = {
  className?: string;
};

export default function AddNotifButton({ className }: addNotifProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof newNotificationSchema>>({
    resolver: zodResolver(newNotificationSchema),
  });

  const { mutate: addNotification } = useMutation({
    mutationFn: async ({ title, content, link }: NewNotification) => {
      const payload: NewNotification = { title, content, link };
      const { data } = await axios.post("/api/notifications", payload);
      return data;
    },
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description: "Your job was not published. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      return toast({
        description: "Your post has been published.",
      });
    },
  });

  async function onSubmit(data: z.infer<typeof newNotificationSchema>) {
    addNotification(data);
    form.reset(data);
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={cn(className)}>Add Notification</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Notification</DialogTitle>
          <DialogDescription>
            Provide a detailed description for the notification here{" "}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Title of Notification</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
