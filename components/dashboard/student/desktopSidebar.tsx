"use client";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export const DesktopSidebar = ({
  className,
  items,
  ...props
}: SidebarProps) => {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "relative hidden min-h-screen pb-12 lg:fixed lg:inset-y-0 lg:z-20 lg:flex lg:w-72 lg:flex-col bg-slate-200",
        className
      )}
      {...props}
    >
      <Link
        href="/overview"
        className="flex items-center gap-2 px-8 py-6 text-2xl font-semibold tracking-tight duration-200 stroke-zinc-800 dark:text-zinc-200 dark:stroke-zinc-500 dark:hover:stroke-white hover:stroke-zinc-700 hover:text-zinc-700 dark:hover:text-white"
      >
        Placement Cell
      </Link>
      <div className="space-y-4">
        <div className="px-6 py-2">
          <div className="space-y-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  pathname === item.href
                    ? "bg-muted hover:bg-muted"
                    : "hover:bg-transparent hover:underline",
                  "w-full justify-start"
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 mx-6 bottom-8"></div>
    </aside>
  );
};
