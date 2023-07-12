"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Home } from "lucide-react";

import { usePathname } from "next/navigation";
import SignInButton from "@/components/SignInButton";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export const MobileSidebar = ({ className, items, ...props }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <div className={cn("lg:hidden", className)} {...props}>
      <Sheet>
        <div className="sticky top-0 z-40 flex items-center justify-end w-full px-4 py-4 bg-white gap-x-6 sm:px-6 lg:hidden">
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
        </div>
        <SheetContent position="top" size="content" className="bg-slate-200">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 px-8 py-6 text-2xl font-semibold tracking-tight duration-200 stroke-zinc-800 dark:text-zinc-200 dark:stroke-zinc-500 dark:hover:stroke-white hover:stroke-zinc-700 hover:text-zinc-700 dark:hover:text-white">
              Placement Cell
            </SheetTitle>
          </SheetHeader>
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
            <div className="py-2">
              <SheetFooter className="relative text-lg font-semibold tracking-tight">
                <SignInButton className="bottom-5" />
              </SheetFooter>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
