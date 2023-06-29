import { isApplied } from "@/actions/jobs";
import { Button } from "../ui/button";

type Props = {
  jobId: string;
};

const ApplyJobButton = async ({ jobId }: Props) => {
  return (
    <>
      {(await isApplied(jobId)) ? (
        <Button>Apply</Button>
      ) : (
        <Button>Applied</Button>
      )}
    </>
  );
};

export default ApplyJobButton;
