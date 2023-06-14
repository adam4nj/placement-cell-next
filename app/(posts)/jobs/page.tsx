import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import JobCard from "@/components/jobCard";
import { getAllJobs } from "@/actions/jobs";
import { db } from "@/lib/db";

export const revalidate = 60;

const JobsPage = async () => {
  const jobs = await db.job.findMany();
  return (
    <>
      <div className="flex flex-col lg:divide-x lg:flex-row">
        <div className="container md:w-5/6 lg:w-3/4 space-y-3">
          <div className="text-3xl p-3 text-start">Job Postings</div>
          {jobs?.length ? (
            <ul className="grid grid-rows-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {jobs?.map((job) => (
                <li key={job.jobId}>
                  <JobCard
                    jobId={job.jobId}
                    title={job.title}
                    details={job.details}
                    location={job.location}
                    salary={job.salary}
                    createdAt={job.createdAt}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p> your job list is empty</p>
          )}
        </div>

        <div className="container sm:w-[600px] md:w-[700px] lg:w-1/4 space-y-3">
          <div className="text-2xl px-1 mt-4">Notifications</div>
          <Separator />
          <Card className="flex flex-col items-center p-2 space-y-3">
            <div className="ml-2 space-y-1">
              <div className="flex flex-row justify-between">
                <p className="text-sm text-left font-medium">Notification 1</p>
                <p className="text-sm font-light">1 day ago</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
              </p>
            </div>
            <div className="ml-2 space-y-1">
              <div className="flex flex-row justify-between">
                <p className="text-sm text-left font-medium">Notification 1</p>
                <p className="text-sm font-light">1 day ago</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
              </p>
            </div>
            {/* Repeat upto this div */}
          </Card>
        </div>
      </div>
    </>
  );
};

export default JobsPage;
