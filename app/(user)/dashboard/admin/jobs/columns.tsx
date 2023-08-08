"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Job, Company } from "@prisma/client";

import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye } from "lucide-react";
import Link from "next/link";

type JobWithCompany = Job & {
  _count: {
    JobApplication: number;
  };
  company: Company;
};

export const columns: ColumnDef<JobWithCompany>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "company.companyName",
    header: "Company",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      const formatted = dayjs(row.original.startDate).format("DD/MM/YYYY");
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => {
      const formatted = dayjs(row.original.endDate).format("DD/MM/YYYY");
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "_count.JobApplication",
    header: "No. of Applicants",
    cell: ({ row }) => {
      return (
        <div className="text-center">{row.original._count.JobApplication}</div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={`/jobs/${row.original.jobId}`}>
                <Button variant="ghost" className="rounded-full">
                  <Eye className="h-4 w-4" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>View Job</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
];
