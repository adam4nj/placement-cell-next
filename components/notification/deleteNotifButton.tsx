"use client";

import { deleteOne } from "@/actions/notifications";
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

type DeleteNotifProps = {
  id: string;
  title: string;
};

const DeleteNotifButton = ({ id, title }: DeleteNotifProps) => {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <TrashIcon className="h-4 w-4" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <div>
                This action cannot be undone. This will permanently delete the
                notification
              </div>
              <span className="flex font-bold text-base px-1">{title}</span>
              <div>from our servers.</div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteOne(id)}>
              Delete Notification
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteNotifButton;
