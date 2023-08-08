"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

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

import { createIntern } from "@/actions/jobs";

export function AcceptOfferDialog({ id }: { id: string }) {
  async function onSubmit(id: string) {
    await createIntern(id)
      .then(() =>
        toast({
          title: "Intern Added!",
          description: "You are now added as a new intern for this job!",
        })
      )
      .catch(() =>
        toast({
          title: "Intern already exists!",
          description: "You are already an intern for this internship!",
          variant: "destructive",
        })
      );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-slate-300 text-black hover:bg-slate-200">
          Accept Job Offer
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You are now accepting the internship offer by clicking
            &quot;Continue&quot;
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onSubmit(id)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
