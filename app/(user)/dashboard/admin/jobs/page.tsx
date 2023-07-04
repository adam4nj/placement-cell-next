import { db } from "@/lib/db";
import { DataTable } from "@/components/dataTable";
import { columns } from "./columns";

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
    <div className="container w-full mx-auto py-10 space-y-4">
      <span className="text-2xl font-semibold">Posted Jobs</span>
      <DataTable columns={columns} data={jobData} />
    </div>
  );
};

export default JobDataPage;
