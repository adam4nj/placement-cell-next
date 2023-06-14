import { getCurrentJob } from "@/actions/jobs";
import ApplyJobButton from "@/components/job/applyJobButton";
import { Job } from "@prisma/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface JobParams {
  params: Job;
}

export default async function Page({ params }: JobParams) {
  const post: Job | null = await getCurrentJob(params.jobId);

  return (
    <div>
      {!post ? (
        <div>Failed to fetch results</div>
      ) : (
        <div>
          <section
            key={post.jobId}
            className="container py-10 flex flex-col lg:flex-row"
          >
            <h1 className="text-5xl font-extrabold">{post.title}</h1>
            <p>{post.details}</p>
            <p>{post.location}</p>
            <p>{dayjs(JSON.parse(JSON.stringify(post.createdAt))).fromNow()}</p>
          </section>
          <ApplyJobButton jobId={post.jobId} />
        </div>
      )}
    </div>
  );
}
