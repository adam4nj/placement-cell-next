import { Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

import JobCard from "@/components/jobCard";
import { getAllPosts } from "@/actions/jobs";
import { notFound } from "next/navigation";
import Search from "@/components/searchBox";

import { JobTypeSelect } from "@/components/job/jobTypeSelect";
import { JobType } from "@prisma/client";

const JobFeed = async ({
  searchParams,
}: {
  searchParams: { q: string; selected: string };
}) => {
  const search = searchParams.q ?? "";
  const selected = searchParams?.selected ?? "";
  const jobs = await getAllPosts(search);
  if (!jobs) return notFound();

  return (
    <>
      <Search />
      <JobTypeSelect selected={selected} />
      <ScrollArea>
        <ul className="grid grid-cols-1 gap-5 px-3 py-5 md:grid-cols-2">
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
      </ScrollArea>
    </>
  );
};

export default JobFeed;
