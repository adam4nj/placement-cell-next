"use client";
import { changeUserStatus } from "@/actions/user";
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

import { userSchema } from "@/lib/validators/usertable";
import { Row } from "@tanstack/react-table";
import { useState } from "react";
import Link from "next/link";

interface VerifyUserProps<TData> {
  row: Row<TData>;
}

export function UserActions<TData>({ row }: VerifyUserProps<TData>) {
  const user = userSchema.parse(row.original);
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof statusSchema>>({
    resolver: zodResolver(statusSchema),
  });

  async function onSubmit(data: z.infer<typeof statusSchema>) {
    setOpen(false);
    await changeUserStatus(user.id, data.status);
    toast({
      title: "Status Updated",
      description: `The user status was updated to ${data.status} `,
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
                <span>Verify User</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuItem>Make a copy</DropdownMenuItem>
            <DropdownMenuItem>Favorite</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify User</DialogTitle>
            <DialogDescription>
              This allows you to grant continued access to this user by
              verifying credentials.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <h4 className="flex flex-col align-text-top">
              Username:
              <br />
              {user.username}
            </h4>
            <h4 className="flex flex-col ">
              Name:
              <br />
              {user.name}
            </h4>
            <h2 className="flex flex-col">
              Role:
              <br />
              {user.role}
            </h2>
            <Link
              href={user.verifyDoc}
              target="_blank"
              className="flex flex-col text-sky-900"
            >
              View Verification document
            </Link>
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
                        defaultValue={user.status}
                        value={field.value}
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
