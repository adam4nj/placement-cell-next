import { CompanyStats } from "@/components/job/companyStats";
import { StatsCard } from "@/components/statsCard";
import { getUser } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function DashBoardPage() {
  const session = await getUser();

  const interns = await db.intern.count({
    where: {
      internapp: {
        job: {
          company: {
            userId: session?.user.id,
          },
        },
      },
    },
  });

  const jobs = await db.job.count({
    where: {
      type: "Job",
      company: {
        userId: session?.user.id,
      },
    },
  });

  const applications = await db.jobApplication.count({
    where: {
      job: {
        company: {
          userId: session?.user.id,
        },
      },
    },
  });
  const accepted = await db.jobApplication.count({
    where: {
      status: "Accepted",
      job: {
        company: {
          userId: session?.user.id,
        },
      },
    },
  });

  const internships = await db.job.count({
    where: {
      type: "Internship",
      company: {
        userId: session?.user.id,
      },
    },
  });

  const i_applications = await db.jobApplication.count({
    where: {
      job: {
        company: {
          userId: session?.user.id,
        },
      },
    },
  });
  const i_accepted = await db.internApplication.count({
    where: {
      status: "Accepted",
      job: {
        company: {
          userId: session?.user.id,
        },
      },
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
    <div className="ml-5 mr-10">
      <h2 className="py-5 text-3xl font-bold">Total Overview</h2>
      <div className="grid grid-cols-1 gap-2">
        <StatsCard title="Total No. of Posts" count={jobs + internships} />
        <StatsCard
          title="Total No. of Applications"
          count={applications + i_applications}
        />
        <StatsCard title="Total No. of Interns Selected" count={interns} />
      </div>

      <CompanyStats data={data} />
    </div>
  );
}
