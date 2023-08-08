import {
  getCurrentJob,
  hasAppliedInternship,
  hasAppliedJob,
  isDuplicate,
} from "@/actions/jobs";
import { BackButton } from "@/components/backButton";
import { JobFeedbackForm } from "@/components/job/JobFeedback";
import { JobApplyButton } from "@/components/job/application";
import { Separator } from "@/components/ui/separator";
import { getUser } from "@/lib/auth";
import { cn } from "@/lib/utils";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { redirect } from "next/navigation";

dayjs.extend(relativeTime);

export const revalidate = 0;

interface JobParams {
  params: {
    jobId: string;
  };
}

export default async function Page({ params }: JobParams) {
  const job = await getCurrentJob(params.jobId);

  const session = await getUser();

  if (!job || !session) redirect("/jobs"); //toast

  const duplicate = await isDuplicate(job.driveDate);

  const hasApplied =
    (await hasAppliedJob(params.jobId, session.user.id)) ||
    (await hasAppliedInternship(params.jobId, session.user.id));

  return (
    <div className="ml-3 flex flex-col space-y-4 py-5">
      <BackButton className="mx-0 md:-mx-3" />
      <h1 className="text-3xl font-black">Position Details</h1>

      <section
        key={job.jobId}
        className="container flex flex-col rounded-lg border-2 border-slate-700 bg-white py-10 drop-shadow-sm"
      >
        <div className="flex flex-col-reverse justify-between gap-2 md:flex-row">
          <h2 className="text-4xl font-extrabold">{job.title}</h2>
          <p>{dayjs(JSON.parse(JSON.stringify(job.createdAt))).fromNow()}</p>
        </div>
        <Link
          className="py-2 text-2xl font-bold"
          href={`/company/${job.company.companyId}`}
        >
          {job.company.companyName}
        </Link>
        <div
          className={cn("flex flex-row justify-between", {
            "flex-col justify-start space-y-4": duplicate && !hasApplied,
          })}
        >
          <p className="text-2xl font-medium">Location : {job.location}</p>
          {session && session.user.role === "STUDENT" && (
            <JobApplyButton
              jobId={job.jobId}
              title={job.title}
              userId={session.user.id}
              hasApplied={hasApplied}
              isDuplicate={!!duplicate}
            />
          )}
        </div>

        <Separator className="my-5 bg-slate-600/60" />
        <div className="space-y-4">
          <h5 className="text-xl font-bold">Job Description</h5>
          <p className="text-lg font-medium">{job.details}</p>
        </div>
      </section>
      <JobFeedbackForm
        userId={session.user.id}
        title={job.title}
        company={job.company.companyName}
        companyId={job.companyId}
      />
    </div>
  );
}
