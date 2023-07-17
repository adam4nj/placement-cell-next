"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { statusSchema } from "@/lib/validators/usertable";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal } from "lucide-react";

import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { companyJobApplicationSchema } from "@/lib/validators/job-application";
import { changeJobAppStatus } from "@/actions/jobs";
import Link from "next/link";

interface JobStatusProps<TData> {
  row: Row<TData>;
}

export function JobAppActions<TData>({ row }: JobStatusProps<TData>) {
  const job = companyJobApplicationSchema.parse(row.original);
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof statusSchema>>({
    resolver: zodResolver(statusSchema),
  });

  async function onSubmit(data: z.infer<typeof statusSchema>) {
    setOpen(false);
    (await changeJobAppStatus(job.jobAppId, data.status))
      ? toast({
          title: "Status Updated",
          description: `The job status was updated to ${data.status} `,
        })
      : toast({
          title: "Error!",
          description: `An error occurred. Please try again.. `,
          variant: "destructive",
        });
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="z-10 w-[160px]">
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <span>Update Status</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuItem>Make a copy</DropdownMenuItem>
            <DropdownMenuItem>Favorite</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Status</DialogTitle>
            <DialogDescription>
              Updates the job applicants status
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <h4 className="flex flex-col align-text-top">
              Job Title:
              <br />
              {job.job.title}
            </h4>
            <h4 className="flex flex-col ">
              Applicant Name:
              <br />
              {job.student!.fName} {job.student!.lName}
            </h4>
            <h2 className="flex flex-row space-x-2">
              Resume:
              <Link href={job.resume} target="_blank">
                View Resume
              </Link>
            </h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6"
              >
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        defaultValue={job.status}
                        value={field.value}
                        //@ts-expect-error
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem value="Accepted">Accepted</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Rejected">Rejected</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Save Changes</Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
