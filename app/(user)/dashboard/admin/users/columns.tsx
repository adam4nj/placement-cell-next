"use client";
import { ColumnDef } from "@tanstack/react-table";

import { User } from "@prisma/client";

import { UserActions } from "@/components/dashboard/admin/userActions";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <UserActions row={row} />;
    },
  },
];
