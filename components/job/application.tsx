"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import { toast } from "../ui/use-toast";

type Props = {
  jobId: string;
  title: string;
};

export const JobApplyButton = ({ jobId, title }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Apply</Button>
      </DialogTrigger>
      <DialogContent className="w-full h-fit px-10">
        <DialogHeader>Apply to this position</DialogHeader>
        <DialogDescription>
          Please upload your up-to-date resume
        </DialogDescription>
        <div className="flex md:flex-row flex-col gap-2 justify-between">
          <div>
            <span className="font-semibold">Job ID</span>
            <br />
            {jobId}
          </div>
          <div>
            <span className="font-semibold">Applied Position</span>
            <br />
            {title}
          </div>
        </div>
        <div className="m-10 px-5 text-center border border-slate-300 rounded-lg bg-slate-100 shadow-inner">
          <UploadDropzone
            endpoint="pdfWithInput"
            input={{ jobId }}
            onClientUploadComplete={(res) => {
              setOpen(false);
              return toast({
                description: `Application have been successfully submitted!`,
              });
            }}
            onUploadError={(error: Error) => {
              return toast({
                description: `We have encountered an error.${error.message} Please try again..`,
                variant: "destructive",
              });
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
