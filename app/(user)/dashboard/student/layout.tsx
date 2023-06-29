import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/sideBarNav";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ProfileCard } from "@/components/profile/profileCard";
export const metadata: Metadata = {
  title: "Company - Dashboard",
  description: "Advanced form example using react-hook-form and Zod.",
};

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/dashboard/student/profile",
  },
  {
    title: "Sign Out",
    href: "/",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function StudentLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="px-10 pt-3  pxpb-16 md:block">
        <div className="flex justify-between">
          <h2 className="text-5xl font-bold tracking-tight mt-6">Dashboard</h2>
          <ProfileCard />
        </div>

        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="bg-slate-100 -mx-4 p-3 lg:w-1/5 rounded-xl">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-auto w-4/5">{children}</div>
        </div>
      </div>
    </>
  );
}
