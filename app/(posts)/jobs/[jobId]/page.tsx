import { getCurrentJob, getStudent, isApplied } from "@/actions/jobs";
import { JobApplyButton } from "@/components/job/application";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getUser } from "@/lib/auth";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { notFound } from "next/navigation";

dayjs.extend(relativeTime);

export const revalidate = 10;

interface JobParams {
  params: {
    jobId: string;
  };
}

export default async function Page({ params }: JobParams) {
  const job = await getCurrentJob(params.jobId);

  const session = await getUser();

  if (!job) return notFound();

  return (
    <div className="space-y-4 py-5">
      <h1 className="text-3xl">Position Details</h1>

      <section
        key={job.jobId}
        className="container py-10 flex flex-col  border rounded-lg"
      >
        <div className="flex flex-col-reverse gap-2 md:flex-row justify-between">
          <h2 className="text-4xl font-extrabold">{job.title}</h2>
          <p>{dayjs(JSON.parse(JSON.stringify(job.createdAt))).fromNow()}</p>
        </div>
        <Link
          className="text-3xl py-2 font-bold"
          href={`/company/${job.company.companyId}`}
        >
          {job.company.companyName}
        </Link>
        <div className="flex flex-row justify-between">
          <p className="text-2xl font-medium">Location : {job.location}</p>
          {session && (
            <>
              {(await isApplied(job.jobId, session.user.id)) ? (
                <Button>Applied</Button>
              ) : (
                <JobApplyButton jobId={job.jobId} title={job.title} />
              )}
            </>
          )}
        </div>
        <Separator className="my-5" />
        <div className="space-y-4">
          <h5 className="text-xl font-bold">Job Description</h5>
          <p className="text-lg font-medium">{job.details}</p>
        </div>
      </section>
    </div>
  );
}
