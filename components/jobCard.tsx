import { LocateIcon } from "lucide-react";
import { Button } from "./ui/button";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import Link from "next/link";

export interface Job {
  id: string;
  title: string;
  details: string;
  location: string;
  createdAt: string;
}

export default function JobCard({
  id,
  title,
  details,
  location,
  createdAt,
}: Job) {
  return (
    <Card className="shadow hover:bg-gray-100 sm:py-3" key={id}>
      <CardHeader className="flex m-auto sm:flex-col md:flex-row lg:flex-col">
        <div className="flex-auto justify-between py-3 md:py-0 lg:py-2">
          <CardTitle className="text-md sm:text-lg">{title}</CardTitle>
          <CardDescription className="text-sm sm:text-md">
            {details}
          </CardDescription>
        </div>
        <Link href={`/jobs/${id}`}>
          <Button className="w-1/2 md:w-auto lg:py-0.5 text-xs md:text-sm">
            Apply
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center text-xs sm:text-sm">
            <LocateIcon className="mr-1 h-3 w-3" />
            {location}
          </div>
          <div className="text-xs sm:text-sm">{createdAt}</div>
        </div>
      </CardContent>
    </Card>
  );
}
