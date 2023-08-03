"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function BackButton({ className }: { className?: string }) {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      className={cn("mx-5 inline-flex w-fit rounded-xl md:mx-10", className)}
      onClick={() => router.back()}
    >
      <ChevronLeft />
      Back
    </Button>
  );
}
