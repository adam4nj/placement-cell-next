"use client";

import { applyJob } from "@/actions/jobs";
import { Button } from "../ui/button";

type Props = {
  jobId: string;
};

const ApplyJobButton = ({ jobId }: Props) => {
  return <Button onClick={() => applyJob(jobId)}>Apply</Button>;
};

export default ApplyJobButton;
