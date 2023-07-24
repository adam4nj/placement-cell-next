import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Company, Job } from "@prisma/client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { LocateIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import Link from "next/link";
dayjs.extend(relativeTime);

interface JobCardProps {
  job: Job & {
    company: Company;
    //likes
  };
}

export default async function JobCard({ job }: JobCardProps) {
  return (
    <Card
      className="border-2 border-slate-500 py-1 drop-shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:translate-x-1"
      key={job.jobId}
    >
      <CardHeader className="m-auto flex py-1 sm:flex-col md:flex-row lg:flex-col">
        <div className="flex-auto justify-between py-3 md:py-0 lg:py-2">
          <CardTitle className="text-md font-bold sm:text-lg">
            {job.title}
          </CardTitle>
          <CardDescription className="sm:text-md text-sm">
            {job.company.companyName}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-3 px-6">
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center text-xs sm:text-sm">
            <LocateIcon className="mr-1 h-3 w-3" />
            {job.location}
          </div>
          <div className="text-xs sm:text-sm">
            {dayjs(JSON.parse(JSON.stringify(job.createdAt))).fromNow()}
          </div>
        </div>
      </CardContent>
      <CardFooter className="py-3">
        <Link href={`/jobs/${job.jobId}`}>
          <Button
            variant="outline"
            className="border-slate-700 text-xs hover:bg-slate-600 hover:text-white active:bg-slate-800 md:w-auto md:text-xs"
          >
            Read More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
