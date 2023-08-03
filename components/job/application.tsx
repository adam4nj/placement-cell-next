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
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

type ApplyButtonProps = {
  jobId: string;
  title: string;
  userId: string;
  hasApplied: boolean;
  isDuplicate?: boolean;
};

export const JobApplyButton = ({
  jobId,
  title,
  userId,
  hasApplied,
  isDuplicate,
}: ApplyButtonProps) => {
  const [open, setOpen] = useState(false);
  const [applied, setApplied] = useState<boolean>(hasApplied);

  return isDuplicate && !hasApplied ? (
    <Alert variant="destructive">
      <AlertTitle className="text-bold">Oops!</AlertTitle>
      <AlertDescription>
        Looks like you have already applied for a job having the same interview
        date. Please delete your application and re-apply.
      </AlertDescription>
    </Alert>
  ) : (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={async () => {
            await hasAppliedJob(jobId, userId);
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
              setApplied(true);

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
