import JobForm from "@/components/job/jobForm";
import { columns } from "./columns";
import { DataTable } from "@/components/dataTable";
import { getAllJobs } from "@/actions/jobs";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const InternshipData = async () => {
  const data = await getAllJobs();
  return (
    <div>
      <Tabs defaultValue="internship-posted" className="w-full">
        <TabsList className="w-[350px] grid grid-cols-2">
          <TabsTrigger value="internship-posted">
            Posted Internships
          </TabsTrigger>
          <TabsTrigger value="internship-applied">
            Applied Internships
          </TabsTrigger>
        </TabsList>
        <TabsContent className="w-full" value="internship-posted">
          <DataTable columns={columns} data={data} />
        </TabsContent>
        <TabsContent value="internship-applied">
          There is nothing here
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InternshipData;
