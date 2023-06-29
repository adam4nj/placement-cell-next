import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getStudentJobs } from "@/actions/jobs";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUser } from "@/lib/auth";
import dayjs from "dayjs";
import { z } from "zod";
import { MoreActions } from "@/components/profile/moreActions";

const getData = async () => {
  const session = await getUser();
  if (session) {
    const jobs = await getStudentJobs(session.user.id);
    return jobs;
  }
};

const AppliedJobs = async () => {
  const data = await getData();

  return (
    <Tabs defaultValue="job-applied" className="w-full">
      <TabsList className="w-[250px] grid grid-cols-2">
        <TabsTrigger value="job-applied">Applied Jobs</TabsTrigger>
        <TabsTrigger value="job-replied">Replied Jobs</TabsTrigger>
      </TabsList>
      <TabsContent className="w-full" value="job-applied">
        <Table>
          <TableCaption>A list of your recent applications.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((app) => (
              <TableRow key={app.jobAppId}>
                <TableCell className="font-medium">{app.job.title}</TableCell>
                <TableCell>{app.job.company.companyName}</TableCell>
                <TableCell>
                  {dayjs(app.appliedAt).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell>{app.status}</TableCell>
                <TableCell>
                  <MoreActions jobAppId={app.jobAppId} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabsContent>
      <TabsContent value="job-replied">There is nothing here</TabsContent>
    </Tabs>
  );
};

export default AppliedJobs;
