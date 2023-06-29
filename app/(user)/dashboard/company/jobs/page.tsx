import { columns } from "./columns";
import { DataTable } from "@/components/dataTable";
import { getAllJobs } from "@/actions/jobs";
import { Job } from "@/lib/validators/job";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Jobs = async () => {
  const data = (await getAllJobs()) as Job[];
  return (
    <Tabs defaultValue="job-posted" className="w-full">
      <TabsList className="w-[250px] grid grid-cols-2">
        <TabsTrigger value="job-posted">Posted Jobs</TabsTrigger>
        <TabsTrigger value="job-applied">Applied Jobs</TabsTrigger>
      </TabsList>
      <TabsContent className="w-full" value="job-posted">
        <DataTable columns={columns} data={data} />
      </TabsContent>
      <TabsContent value="job-applied">There is nothing here</TabsContent>
    </Tabs>
  );
};

export default Jobs;
