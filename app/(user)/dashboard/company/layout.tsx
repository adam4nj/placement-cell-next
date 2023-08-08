import { Metadata } from "next";
import { redirect } from "next/navigation";

import { getUser } from "@/lib/auth";
import { DesktopSidebar } from "@/components/dashboard/student/desktopSidebar";
import { MobileSidebar } from "@/components/dashboard/student/mobileSidebar";
import CurrentPath from "@/components/dashboard/pathname";
import { ProfileNav } from "@/components/dashboard/profileNav";

export const metadata: Metadata = {
  title: "Company - Dashboard",
  description: "Company Dashboard for Placement Cell JMC",
};

const sidebarItems = [
  {
    title: "Overview",
    href: "/dashboard/company",
  },
  {
    title: "Jobs",
    href: "/dashboard/company/jobs",
  },
  {
    title: "Applications",
    href: "/dashboard/company/applications",
  },
  {
    title: "Interns",
    href: "/dashboard/company/interns",
  },
  {
    title: "Feedback",
    href: "/dashboard/company/feedback",
  },
];

interface CompanyLayoutProps {
  children: React.ReactNode;
}

export default async function CompanyLayout({ children }: CompanyLayoutProps) {
  const session = await getUser();
  if (!session) redirect("/login");
  return (
    <>
      <DesktopSidebar items={sidebarItems} />
      <MobileSidebar items={sidebarItems} />

      <div className="relative m-5 lg:pl-72">
        <div className="sticky top-5 z-20 flex flex-row justify-between rounded-xl bg-slate-800 p-5 pt-5">
          <h6 className="mx-5 text-3xl font-black text-white">
            Dashboard / <CurrentPath className="text-slate-200" />
          </h6>
          <div className="ml-auto hidden items-center space-x-4 sm:flex">
            <span className="hidden text-white sm:block">
              {session.user.name}
            </span>
            <ProfileNav session={session} />
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
