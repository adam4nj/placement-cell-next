"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      className="inline-flex w-fit rounded-xl mx-5 md:mx-10"
      onClick={() => router.back()}
    >
      <ChevronLeft />
      Back
    </Button>
  );
}
