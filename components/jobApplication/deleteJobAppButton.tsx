"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { deleteJobApplication } from "@/actions/jobs";

type DeleteJobAppProps = {
  jobAppId: string;
  title: string;
};

const DeleteJobAppButton = ({ jobAppId, title }: DeleteJobAppProps) => {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Delete Job</span>
            <TrashIcon className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              This action cannot be undone. This will permanently delete the job
              application
              <span className="flex font-bold text-base px-1">{title}</span>
              from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteJobApplication(jobAppId)}>
              Delete Job
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteJobAppButton;
