import { CompanyStats } from "@/components/job/companyStats";
import { db } from "@/lib/db";

const AdminPage = async () => {
  const jobs = await db.job.count({
    where: {
      type: "Job",
    },
  });

  const applications = await db.jobApplication.count();

  const internships = await db.job.count({
    where: {
      type: "Internship",
    },
  });

  const i_applications = await db.jobApplication.count();

  const data = [
    {
      type: "Jobs",
      Posts: jobs,
      Applications: applications,
    },
    {
      type: "Internships",
      Posts: internships,
      Applications: i_applications,
    },
  ];

  return (
    <div className="w-full">
      <CompanyStats data={data} />
    </div>
  );
};

export default AdminPage;
