import { LocateIcon } from "lucide-react";
import { Button } from "./ui/button";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Job } from "@prisma/client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ApplyJobButton from "./job/applyJobButton";
dayjs.extend(relativeTime);

export default async function JobCard({
  jobId,
  title,
  details,
  location,
  createdAt,
}: Job) {
  const session = await getServerSession(authOptions);

  return (
    <Card className="shadow hover:bg-gray-100 sm:py-3" key={jobId}>
      <CardHeader className="flex m-auto sm:flex-col md:flex-row lg:flex-col">
        <div className="flex-auto justify-between py-3 md:py-0 lg:py-2">
          <CardTitle className="text-md sm:text-lg">{title}</CardTitle>
          <CardDescription className="text-sm sm:text-md">
            {details}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center text-xs sm:text-sm">
            <LocateIcon className="mr-1 h-3 w-3" />
            {location}
          </div>
          <div className="text-xs sm:text-sm">
            {dayjs(JSON.parse(JSON.stringify(createdAt))).fromNow()}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {session?.user.role === "STUDENT" && (
          <div>
            <ApplyJobButton jobId={jobId} />
            <Link href={`/jobs/${jobId}`}>
              <Button
                variant="outline"
                className="w-1/2 md:w-auto lg:py-0.5 text-xs md:text-sm"
              >
                Read More
              </Button>
            </Link>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
