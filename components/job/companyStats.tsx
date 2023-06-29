import { getUser } from "@/lib/auth";
import { StatsCard } from "../statsCard";
import { db } from "@/lib/db";

export async function CompanyStats() {
  const session = await getUser();

  const jobs = await db.job.count({
    where: {
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

  const internships = await db.internship.count({
    where: {
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

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCard title="Total Jobs" count={jobs || 0} percentage={jobs || 0} />
      <StatsCard
        title="Total Job Applications"
        count={applications || 0}
        percentage={applications || 0}
      />
      <StatsCard
        title="Total Internships"
        count={internships || 0}
        percentage={internships || 0}
      />
      <StatsCard
        title="Total Internship Applications"
        count={i_applications || 0}
        percentage={i_applications || 0}
      />
    </div>
  );
}
