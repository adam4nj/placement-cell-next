import { CloseButton } from "@/components/closeButton";
import JobForm from "@/components/job/jobForm";
import { FC } from "react";

const page: FC = () => {
  return (
    <div className="absolute flex inset-0 bg-zinc-900/20 z-10 align-middle">
      <div className="container flex items-center w-2/3 mx-auto">
        <div className="relative bg-white w-full h-fit py-10 px-8 rounded-lg">
          <div className="absolute top-4 right-4">
            <CloseButton />
          </div>
          <JobForm />
        </div>
      </div>
    </div>
  );
};

export default page;
