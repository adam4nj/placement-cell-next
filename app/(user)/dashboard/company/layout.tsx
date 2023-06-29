import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/sideBarNav";
import { AddJob } from "@/components/job/addJob";

export const metadata: Metadata = {
  title: "Company - Dashboard",
  description: "Advanced form example using react-hook-form and Zod.",
};

const sidebarNavItems = [
  {
    title: "Jobs",
    href: "/dashboard/company/jobs",
  },
  {
    title: "Internships",
    href: "/dashboard/company/internships",
  },
  {
    title: "Notifications",
    href: "/dashboard/company/notifications",
  },
  {
    title: "Feedback",
    href: "/dashboard/company/feedback",
  },
  {
    title: "Display",
    href: "/examples/forms/display",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="px-10 pb-10  pxpb-16 md:block">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <AddJob />
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
