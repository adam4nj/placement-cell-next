import { db } from "@/lib/db";
import { DataTable } from "@/components/dataTable";
import { columns } from "./columns";
import { Separator } from "@/components/ui/separator";

const JobDataPage = async () => {
  const jobData = await db.job.findMany({
    include: {
      company: true,
      _count: {
        select: { JobApplication: true },
      },
    },
  });

  return (
    <div className="container mx-auto w-full py-10">
      <div>
        <span className="text-2xl font-bold">Posted Jobs</span>
        <Separator className="my-5 bg-black" />
        <DataTable columns={columns} data={jobData} />
      </div>
    </div>
  );
};

export default JobDataPage;
