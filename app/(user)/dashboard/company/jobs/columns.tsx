"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Job } from "@/lib/validators/job";
import DeleteJobButton from "@/components/job/deleteJob";
import { EditJobButton } from "@/components/job/editJob";

export const jobcolumns: ColumnDef<Job>[] = [
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
    accessorKey: "title",
    header: "Title",
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
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => {
      const salary = parseFloat(row.getValue("salary"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(salary);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: "editjob",
    cell: ({ row }) => {
      const job = row.original;
      return <EditJobButton job={job} />;
    },
  },
  {
    id: "deletejob",
    cell: ({ row }) => {
      const job = row.original;
      return <DeleteJobButton jobId={job.jobId} title={job.title} />;
    },
  },
];
