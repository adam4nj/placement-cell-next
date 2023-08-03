import { appcolumns1, appcolumns2 } from "./columns";
import { DataTable } from "@/components/dataTable";
import {
  getAllInternApplications,
  getAllJobApplications,
} from "@/actions/jobs";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompanyInternApplication } from "@/lib/validators/job-application";
import { Separator } from "@/components/ui/separator";

const InternshipPage = async () => {
  const jobs = await getAllJobApplications();
  const internships =
    (await getAllInternApplications()) as CompanyInternApplication[];
  return (
    <>
      <div className="mx-6 mb-3 mt-6 flex justify-between">
        <div className="text-2xl font-bold text-black">Applications</div>
      </div>
      <Separator className="my-5 bg-black" />

      <Tabs defaultValue="job-posted" className="mx-5">
        <TabsList className="grid w-[350px] grid-cols-2">
          <TabsTrigger value="job-posted">Job Applications</TabsTrigger>
          <TabsTrigger value="job-applied">Internship Applications</TabsTrigger>
        </TabsList>
        <TabsContent className="w-full" value="job-posted">
          <DataTable columns={appcolumns1} data={jobs} />
        </TabsContent>
        <TabsContent className="w-full" value="job-applied">
          <DataTable columns={appcolumns2} data={internships} />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default InternshipPage;
