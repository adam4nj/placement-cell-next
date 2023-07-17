import { getAllJobApplications, getStudentJobs } from "@/actions/jobs";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { applied_columns, replied_columns } from "./columns";
import { DataTable } from "@/components/dataTable";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const StudentDashboard = async () => {
  const applied = await getStudentJobs();
  const replied = await getAllJobApplications();

  return (
    <>
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
      <div className="p-10 border border-slate-700 rounded-xl space-y-5">
        <span className="text-3xl font-bold">Current Jobs</span>
        <Separator className="bg-black" />
        <Card className="p-5 space-y-4 border-slate-500">
          <CardTitle className="mx-5 text-lg">Job 1</CardTitle>
          <CardContent>
            Description 1 <br />
            Payment
          </CardContent>
        </Card>
        <Card className="p-5 space-y-4 border-slate-500">
          <CardTitle className="mx-5 text-lg">Job 1</CardTitle>
          <CardContent>Description 1</CardContent>
        </Card>
      </div>
    </>
  );
};

export default StudentDashboard;
