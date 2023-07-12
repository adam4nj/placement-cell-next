import { getAllJobApplications, getStudentJobs } from "@/actions/jobs";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { applied_columns, replied_columns } from "./columns";
import { DataTable } from "@/components/dataTable";

const AppliedJobs = async () => {
  const applied = await getStudentJobs();
  const replied = await getAllJobApplications();

  return (
    <Tabs defaultValue="job-applied" className="w-full">
      <TabsList className="w-[250px] grid grid-cols-2">
        <TabsTrigger value="job-applied">Applied Jobs</TabsTrigger>
        <TabsTrigger value="job-replied">Replied Jobs</TabsTrigger>
      </TabsList>
      <TabsContent className="w-full" value="job-applied">
        <DataTable columns={applied_columns} data={applied} />
      </TabsContent>
      <TabsContent className="w-full" value="job-replied">
        <DataTable columns={replied_columns} data={replied} />
      </TabsContent>
    </Tabs>
  );
};

export default AppliedJobs;
