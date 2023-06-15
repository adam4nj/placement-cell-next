import { Metadata } from "next";
import Image from "next/image";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
};

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/examples/forms",
  },
  {
    title: "Account",
    href: "/examples/forms/account",
  },
  {
    title: "Appearance",
    href: "/examples/forms/appearance",
  },
  {
    title: "Notifications",
    href: "/examples/forms/notifications",
  },
  {
    title: "Display",
    href: "/examples/forms/display",
  },
];

interface ProfileLayoutProps {
  children: React.ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <>
      <div className="hidden px-5 py-3 pb-16 md:block space-y-5">
        <Sheet>
          <SheetTrigger asChild>
            <button className="mx-auto items-start justify-start">
              <MenuIcon className="w-4 h-4" />
            </button>
          </SheetTrigger>
          <SheetContent position="left" size="sm">
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">Profile</div>
              <div className="grid grid-cols-4 items-center gap-4">Logout</div>
            </div>
            <SheetFooter>
              <SheetClose asChild>x </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <div className="flex flex-col px-10 space-y-6 lg:flex-row lg:space-x-12 lg:space-y-0">
          <div className="w-full">
            <div className="flex flex-row justify-between">
              <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
                <p className="text-muted-foreground">
                  Manage your account settings and set e-mail preferences.
                </p>
              </div>

              <Card className="w-fit flex flex-row p-7 rounded-xl">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col p-3">
                  <h2 className="text-lg font-semibold">Full Name</h2>
                  <p>User name</p>
                </div>
              </Card>
            </div>

            <Separator className="my-6" />
            <div className="w-4/5">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
