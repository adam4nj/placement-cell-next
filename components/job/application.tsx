"use client";

import { useDropzone } from "react-dropzone";
import type { FileWithPath } from "react-dropzone";

import { useUploadThing } from "@/utils/uploadthing";

import { Check, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { hasAppliedInternship, hasAppliedJob } from "@/actions/jobs";
import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { useCallback, useState } from "react";
import { toast } from "../ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { useSession } from "next-auth/react";
import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";

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
  const [files, setFiles] = useState<File[]>([]);
  const [checked, setChecked] = useState(false);
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles((previousFiles) => [
      ...previousFiles,
      ...acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      ),
    ]);
  }, []);
  const fileTypes = ["application/pdf"];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
    maxFiles: 1,
  });

  const { startUpload, isUploading } = useUploadThing("pdfWithInput", {
    onClientUploadComplete: () => {
      setApplied(true);

      setOpen(false);

      return toast({
        description: `Application have been successfully submitted!`,
      });
    },
    onUploadError: () => {
      return toast({
        description: `We have encountered an error. Please try again..`,
        variant: "destructive",
      });
    },
  });
  const [open, setOpen] = useState(false);
  const [applied, setApplied] = useState<boolean>(hasApplied);
  const removeFile = (name: string) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };
  const { data: session } = useSession();

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
            (await hasAppliedJob(jobId, userId)) ||
              (await hasAppliedInternship(jobId, userId));
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
      <DialogContent className="border-2 border-black sm:max-h-[400px] sm:max-w-[600px]">
        <DialogHeader className="font-bold">
          <DialogTitle className="text-2xl font-bold">
            Apply to this position
          </DialogTitle>
          <DialogDescription>
            Please upload your up-to-date resume
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-2">
          <Card className="flex flex-col px-7 py-2">
            <span className="font-bold">Applied Position</span>
            {title}
          </Card>
          <Card className="flex flex-col px-7 py-2">
            <span className="font-bold">Applicant Name</span>
            {session?.user.name}
          </Card>
        </div>
        {files.length > 0 ? (
          files.map((file) => (
            <>
              <span className="text-center">Selected File : {file.name}</span>
              <span>{isUploading && <Loader2 />}</span>
              <div className="block space-x-2 py-2 text-center">
                <Checkbox
                  checked={checked}
                  onCheckedChange={() => setChecked(!checked)}
                />
                <span>
                  I have completely understood the requirements needed for the
                  job.
                </span>
              </div>
              <div className="flex flex-row justify-between">
                <Button
                  variant="destructive"
                  onClick={() => removeFile(file.name)}
                >
                  Remove File
                </Button>
                <DialogFooter>
                  <Button
                    disabled={!checked}
                    onClick={() => startUpload(files, { jobId })}
                  >
                    Upload Resume
                  </Button>
                </DialogFooter>
              </div>
            </>
          ))
        ) : (
          <div className="bg-slate-100 p-10 text-center text-xl font-bold text-slate-500 drop-shadow-md">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              Drop your resume here..
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
