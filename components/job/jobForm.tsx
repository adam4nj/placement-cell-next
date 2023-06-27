"use client";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewJob, newJobSchema } from "@/lib/validators/job";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

const JobForm = () => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof newJobSchema>>({
    resolver: zodResolver(newJobSchema),
    defaultValues: {
      title: "",
      location: "",
      details: "",
      salary: 0,
    },
  });

  const { mutate: createJob } = useMutation({
    mutationFn: async ({ title, location, salary, details, date }: NewJob) => {
      const payload: NewJob = { title, location, salary, details, date };
      const { data } = await axios.post("/api/jobs/create", payload);
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
      //not working
      //const newPathname = pathname.split("/").slice(0, -1).join("/");
      //router.push(newPathname);

      //router.refresh();

      router.back();

      return toast({
        description: "Your post has been published.",
      });
    },
  });

  async function onSubmit(values: NewJob) {
    form.reset();
    createJob(values);
  }

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
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      <Input placeholder="Expected salary" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                              "w-[300px] justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value?.from ? (
                              field.value.to ? (
                                <>
                                  {format(field.value.from, "LLL dd, y")} -{" "}
                                  {format(field.value.to, "LLL dd, y")}
                                </>
                              ) : (
                                format(field.value.from, "LLL dd, y")
                              )
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={field.value?.from}
                          selected={field.value}
                          onSelect={field.onChange}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Details</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe about the job"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Add a description about the job.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="items-center justify-center">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default JobForm;
