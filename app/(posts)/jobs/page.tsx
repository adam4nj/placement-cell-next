import JobItem from "@/components/JobItem";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const JobsPage = async () => {
  //const jobs = await db.job.findMany();
  const session = await getServerSession(authOptions);

  if (!session) redirect("api/auth/signin");

  return JSON.stringify(session);

  /* return (
    <main className="container">
      {JSON.stringify(session)}
      {jobs.map((job) => (
        <JobItem
          id={job.id}
          title={job.title}
          desc={job.content}
          location={job.location}
        />
      ))}
    </main>
  );*/
};

export default JobsPage;
