import { jobcolumns } from "./columns";
import { DataTable } from "@/components/dataTable";
import { getCompanyInternships, getCompanyJobs } from "@/actions/jobs";
import { Job } from "@/lib/validators/job";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobForm from "@/components/job/jobForm";
import { getUser } from "@/lib/auth";
import { Separator } from "@/components/ui/separator";

const Jobs = async () => {
  const session = await getUser();
  const jobdata = (await getCompanyJobs()) as Job[];
  const internshipdata = (await getCompanyInternships()) as Job[];
  return (
    <>
      <div className="mx-6 mb-2 mt-6 flex justify-between align-middle">
        <div className="text-2xl font-bold text-black">
          Jobs and Internships
        </div>
        <JobForm session={session} />
      </div>
      <Separator className="my-5 bg-black" />
      <Tabs defaultValue="job-posted" className="mx-5">
        <TabsList className="grid w-[300px] grid-cols-2">
          <TabsTrigger value="job-posted">Posted Jobs</TabsTrigger>
          <TabsTrigger value="job-applied">Posted Internships</TabsTrigger>
        </TabsList>
        <TabsContent className="w-full" value="job-posted">
          <DataTable columns={jobcolumns} data={jobdata} />
        </TabsContent>
        <TabsContent className="w-full" value="job-applied">
          <DataTable columns={jobcolumns} data={internshipdata} />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Jobs;
