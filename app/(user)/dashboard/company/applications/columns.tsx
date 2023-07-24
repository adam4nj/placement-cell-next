"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CompanyJobApplication,
  CompanyInternApplication,
} from "@/lib/validators/job-application";
import Link from "next/link";
import { File } from "lucide-react";
import { JobAppActions } from "@/components/dashboard/company/jobAppActions";

export const appcolumns1: ColumnDef<CompanyJobApplication>[] = [
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
    id: "fullName",
    header: "Name of Applicant",
    accessorFn: (row) => `${row.student!.fName} ${row.student!.lName}`,
  },
  {
    accessorKey: "job.title",
    header: "Applied For",
  },

  {
    accessorKey: "createdAt",
    header: "Created On",
    cell: ({ row }) => {
      const createddate = Date.parse(row.getValue("createdAt"));
      const formatted = new Intl.DateTimeFormat("en-UK", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }).format(createddate);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "resume",
    header: "Resume",
    cell: ({ row }) => {
      return (
        <Link href={row.original.resume} target="_blank">
          <File />
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <JobAppActions row={row} />;
    },
  },
];

export const appcolumns2: ColumnDef<CompanyInternApplication>[] = [
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
    id: "fullName",
    header: "Name of Applicant",
    accessorFn: (row) => `${row.student!.fName} ${row.student!.lName}`,
  },
  {
    accessorKey: "job.title",
    header: "Applied For",
  },

  {
    accessorKey: "createdAt",
    header: "Created On",
    cell: ({ row }) => {
      const createddate = Date.parse(row.getValue("createdAt"));
      const formatted = new Intl.DateTimeFormat("en-UK", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }).format(createddate);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "resume",
    header: "Resume",
    cell: ({ row }) => {
      return (
        <Link href={row.original.resume} target="_blank">
          <File />
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <JobAppActions row={row} />;
    },
  },
];
