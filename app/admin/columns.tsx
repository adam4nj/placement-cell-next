"use client";
import { ColumnDef } from "@tanstack/react-table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { db } from "@/lib/db";
import { User, userSchema } from "@/lib/validators/usertable";
import { Status } from "@prisma/client";
import { changeStatus } from "@/actions/user";

export const columns: ColumnDef<User>[] = [
  { accessorKey: "id", header: "ID" },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
    id: "actions",
    cell: ({ row }) => {
      const user = userSchema.parse(row.original);

      return (
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value="Accepted"
              onSelect={() => changeStatus(user, "Accepted")}
            >
              Accepted
            </SelectItem>
            <SelectItem
              value="Pending"
              onSelect={() => changeStatus(user, "Pending")}
            >
              Pending
            </SelectItem>
            <SelectItem
              value="Rejected"
              onSelect={() => changeStatus(user, "Rejected")}
            >
              Rejected
            </SelectItem>
          </SelectContent>
        </Select>
      );
    },
  },
];
