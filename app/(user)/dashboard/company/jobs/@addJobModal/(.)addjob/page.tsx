"use client";

import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import JobForm from "@/components/job/jobForm";

const AddJobPage = () => {
  const router = useRouter();

  return (
    <div className="absolute inset-0 bg-zinc-900/20 z-30 h-full align-middle">
      <div className="container flex items-center h-full md:w-2/3 mx-5 lg:m-auto ">
        <div className="relative bg-white w-full mt-5 rounded-lg">
          <div className="absolute top-4 right-4">
            <Button variant="ghost" onClick={() => router.back()}>
              <XIcon className="w-6 h-6" />
            </Button>
          </div>
          <JobForm />
        </div>
      </div>
    </div>
  );
};

export default AddJobPage;
