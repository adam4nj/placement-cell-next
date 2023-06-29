import { Loader2 } from "lucide-react";

import JobCard from "@/components/jobCard";
import { getAllJobs } from "@/actions/jobs";
import { notFound } from "next/navigation";

const JobFeed = async () => {
  const jobs = await getAllJobs();

  if (!jobs) return notFound();

  return (
    <ul className="flex flex-col col-span-2 space-y-6">
      {jobs.map((job, index) => {
        if (index === jobs.length - 1) {
          // Add a ref to the last post in the list
          return (
            <li key={job.jobId}>
              <JobCard key={job.jobId} job={job} />
            </li>
          );
        } else {
          return <JobCard key={job.jobId} job={job} />;
        }
      })}
    </ul>
  );
};

export default JobFeed;
