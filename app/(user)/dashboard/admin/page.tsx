import { CompanyStats } from "@/components/job/companyStats";
import { StatsCard } from "@/components/statsCard";
import { db } from "@/lib/db";

const AdminPage = async () => {
  const student = await db.student.count();
  const company = await db.company.count();

  const interns = await db.intern.count();

  const jobs = await db.job.count({
    where: {
      type: "Job",
    },
  });

  const applications = await db.jobApplication.count();
  const accepted = await db.jobApplication.count({
    where: {
      status: "Accepted",
    },
  });

  const internships = await db.job.count({
    where: {
      type: "Internship",
    },
  });

  const i_applications = await db.jobApplication.count();
  const i_accepted = await db.internApplication.count({
    where: {
      status: "Accepted",
    },
  });

  const data = [
    {
      type: "Jobs",
      Posts: jobs,
      Applications: applications,
      Accepted: accepted,
    },
    {
      type: "Internships",
      Posts: internships,
      Applications: i_applications,
      Accepted: i_accepted,
    },
  ];

  return (
    <div className="w-full">
      <h2 className="py-5 text-3xl font-bold">Total Overview</h2>
      <div className="grid grid-cols-2 gap-2">
        <StatsCard title="Total No. of Users" count={student + company} />
        <StatsCard title="Total No. of Posts" count={jobs + internships} />
        <StatsCard
          title="Total No. of Applications"
          count={applications + i_applications}
        />
        <StatsCard title="Total No. of Interns Selected" count={interns} />
      </div>

      <CompanyStats data={data} student={student} company={company} />
    </div>
  );
};

export default AdminPage;
