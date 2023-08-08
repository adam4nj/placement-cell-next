import {
  getAllJobApplications,
  getStudentIJobs,
  getStudentInternships,
  getStudentJobs,
} from "@/actions/jobs";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  applied_columns,
  replied_columns,
  applied_icolumns,
  replied_icolumns,
} from "./columns";
import { DataTable } from "@/components/dataTable";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const StudentDashboard = async () => {
  const applied = await getStudentJobs();
  const i_applied = await getStudentIJobs();

  return (
    <>
      <Accordion type="single" collapsible defaultValue="jobs">
        <AccordionItem value="jobs">
          <AccordionTrigger className="mx-6 mb-3 mt-6 flex justify-between text-2xl font-bold  text-black">
            Job Applications
          </AccordionTrigger>
          <AccordionContent>
            <Separator className="mb-5 bg-black" />
            <Tabs defaultValue="job-applied" className="w-full">
              <TabsList className="grid w-[250px] grid-cols-2">
                <TabsTrigger value="job-applied">Applied Jobs</TabsTrigger>
                <TabsTrigger value="job-replied">Replied Jobs</TabsTrigger>
              </TabsList>
              <TabsContent className="w-full" value="job-applied">
                <DataTable columns={applied_columns} data={applied} />
              </TabsContent>
              <TabsContent className="w-full" value="job-replied">
                <DataTable columns={replied_columns} data={applied} />
              </TabsContent>
            </Tabs>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="internships">
          <AccordionTrigger className="mx-6 mb-3 mt-6 flex justify-between text-2xl font-bold  text-black">
            Internship Applications
          </AccordionTrigger>
          <AccordionContent>
            <Separator className="mb-5 bg-black" />
            <Tabs defaultValue="job-applied" className="w-full">
              <TabsList className="grid w-[300px] grid-cols-2">
                <TabsTrigger value="job-applied">
                  Applied Internships
                </TabsTrigger>
                <TabsTrigger value="job-replied">
                  Replied Internships
                </TabsTrigger>
              </TabsList>
              <TabsContent className="w-full" value="job-applied">
                <DataTable columns={applied_icolumns} data={i_applied} />
              </TabsContent>
              <TabsContent className="w-full" value="job-replied">
                <DataTable columns={replied_icolumns} data={i_applied} />
              </TabsContent>
            </Tabs>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default StudentDashboard;
