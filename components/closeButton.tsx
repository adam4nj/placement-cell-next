"use client";

import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const CloseButton = () => {
  const router = useRouter();

  return (
    <>
      <Button variant="ghost" onClick={() => router.back()}>
        <XIcon className="w-6 h-6" />
      </Button>
    </>
  );
};
