"use client";

import { TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { deleteJobFeedback } from "@/actions/user";

const DeleteJobFeedbackButton = ({ id }: { id: string }) => {
  return (
    <Button
      variant="outline"
      className="h-12 w-12 rounded-full border-slate-600 opacity-60"
      onClick={() => deleteJobFeedback(id)}
    >
      <TrashIcon />
    </Button>
  );
};

export default DeleteJobFeedbackButton;
