"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function CurrentPath({
  className,
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const currentPath = pathname.split("/").at(-1);
  const finalPath = currentPath
    ? currentPath.charAt(0).toUpperCase() + currentPath.slice(1)
    : "";
  return <span className={cn(className)}>{finalPath}</span>;
}
