"use client";

import { Check } from "lucide-react";
import { Button } from "../ui/button";
import { hasAppliedJob } from "@/actions/jobs";
import { cn } from "@/lib/utils";

import { UploadDropzone } from "@/utils/uploadthing";

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
  userId: string;
  hasApplied: boolean;
};

export const JobApplyButton = ({ jobId, title, userId, hasApplied }: Props) => {
  const [open, setOpen] = useState(false);
  const [applied, setApplied] = useState(hasApplied);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={async () => {
            await hasAppliedJob(jobId, userId);
            setApplied(true);
          }}
          className={cn("bg-black", {
            "bg-blue-950": hasApplied,
          })}
          disabled={applied}
        >
          {applied ? (
            <div className="inline-flex">
              <Check />
              Applied
            </div>
          ) : (
            <span>Apply</span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="h-fit w-full px-10">
        <DialogHeader>Apply to this position</DialogHeader>
        <DialogDescription>
          Please upload your up-to-date resume
        </DialogDescription>
        <div className="flex flex-col justify-between gap-2 md:flex-row">
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
        <div className="m-10 rounded-lg border border-slate-300 bg-slate-100 px-5 text-center shadow-inner">
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
