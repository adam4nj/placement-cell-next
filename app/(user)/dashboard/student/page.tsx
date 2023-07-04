import { getStudentJobs } from "@/actions/jobs";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { columns } from "./columns";
import { DataTable } from "@/components/dataTable";

const AppliedJobs = async () => {
  const data = await getStudentJobs();

  return (
    <Tabs defaultValue="job-applied" className="w-full">
      <TabsList className="w-[250px] grid grid-cols-2">
        <TabsTrigger value="job-applied">Applied Jobs</TabsTrigger>
        <TabsTrigger value="job-replied">Replied Jobs</TabsTrigger>
      </TabsList>
      <TabsContent className="w-full" value="job-applied">
        <DataTable columns={columns} data={data} />
      </TabsContent>
      <TabsContent value="job-replied">There is nothing here</TabsContent>
    </Tabs>
  );
};

export default AppliedJobs;
