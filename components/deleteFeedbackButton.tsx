"use client";

import { TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { deleteFeedback } from "@/actions/user";

const DeleteFeedbackButton = ({ id }: { id: string }) => {
  return (
    <Button
      variant="outline"
      className="rounded-full h-12 w-12 border-slate-600 opacity-60"
      onClick={() => deleteFeedback(id)}
    >
      <TrashIcon />
    </Button>
  );
};

export default DeleteFeedbackButton;
