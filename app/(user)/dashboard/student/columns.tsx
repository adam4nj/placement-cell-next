"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CompanyJobApplication,
  StudentJobApplication,
} from "@/lib/validators/job-application";
import dayjs from "dayjs";
import DeleteJobAppButton from "@/components/jobApplication/deleteJobAppButton";
import { Badge } from "@/components/ui/badge";

export const applied_columns: ColumnDef<StudentJobApplication>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "job.title",
    header: "Title",
  },
  {
    accessorKey: "job.company.companyName",
    header: "Company",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const formatted = dayjs(row.original.createdAt).format("DD/MM/YYYY");
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: "deletejob",
    cell: ({ row }) => {
      const jobApp = row.original;
      return (
        <DeleteJobAppButton
          jobAppId={jobApp.jobAppId}
          title={jobApp.job.title}
        />
      );
    },
  },
];

export const replied_columns: ColumnDef<CompanyJobApplication>[] = [
  {
    accessorKey: "job.title",
    header: "Title",
  },
  {
    accessorKey: "job.company.companyName",
    header: "Company",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const formatted = dayjs(row.original.createdAt).format("DD/MM/YYYY");
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      if (status === "Accepted") return <Badge>Accepted</Badge>;
      else return <span>{status}</span>;
    },
  },
];
