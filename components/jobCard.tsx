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
    <Card className="shadow hover:bg-gray-100 sm:py-3" key={job.jobId}>
      <CardHeader className="flex m-auto sm:flex-col md:flex-row lg:flex-col">
        <div className="flex-auto justify-between py-3 md:py-0 lg:py-2">
          <CardTitle className="text-md sm:text-lg">{job.title}</CardTitle>
          <CardDescription className="text-sm sm:text-md">
            {job.company.companyName}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
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
      <CardFooter>
        <div>
          <Link href={`/jobs/${job.jobId}`}>
            <Button
              variant="outline"
              className="w-1/2 md:w-auto lg:py-0.5 text-xs md:text-sm"
            >
              Read More
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
