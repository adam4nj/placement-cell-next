import { jobcolumns, appcolumns } from "./columns";
import { DataTable } from "@/components/dataTable";
import { getAllJobApplications, getAllJobs } from "@/actions/jobs";
import { Job } from "@/lib/validators/job";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddJob } from "@/components/job/addJob";

const Jobs = async () => {
  const jobdata = (await getAllJobs()) as Job[];
  const applications = await getAllJobApplications();
  return (
    <>
      <div className="my-5 flex justify-end">
        <AddJob />
      </div>
      <Tabs defaultValue="job-posted" className="w-full">
        <TabsList className="grid w-[250px] grid-cols-2">
          <TabsTrigger value="job-posted">Posted Jobs</TabsTrigger>
          <TabsTrigger value="job-applied">Applied Jobs</TabsTrigger>
        </TabsList>
        <TabsContent className="w-full" value="job-posted">
          <DataTable columns={jobcolumns} data={jobdata} />
        </TabsContent>
        <TabsContent value="job-applied">
          <DataTable columns={appcolumns} data={applications} />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Jobs;
