import { Metadata } from "next";
import { redirect } from "next/navigation";

import { getUser } from "@/lib/auth";
import { DesktopSidebar } from "@/components/dashboard/student/desktopSidebar";
import { MobileSidebar } from "@/components/dashboard/student/mobileSidebar";
import CurrentPath from "@/components/dashboard/pathname";
import { ProfileNav } from "@/components/dashboard/profileNav";

export const metadata: Metadata = {
  title: "Company - Dashboard",
  description: "Advanced form example using react-hook-form and Zod.",
};

const sidebarItems = [
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
];

interface CompanyLayoutProps {
  children: React.ReactNode;
}

export default async function CompanyLayout({ children }: CompanyLayoutProps) {
  const session = await getUser();
  if (!session || session.user.role !== "COMPANY") redirect("/api/auth/signin");
  return (
    <>
      <DesktopSidebar items={sidebarItems} />
      <MobileSidebar items={sidebarItems} />

      <div className="m-5 lg:pl-72">
        <div className="flex flex-row justify-between pt-5">
          <h6 className="mx-5 text-3xl font-black">
            Dashboard / <CurrentPath className="text-slate-600" />
          </h6>
          <div className="ml-auto hidden items-center space-x-4 sm:flex">
            <span className="hidden sm:block">{session.user.name}</span>
            <ProfileNav session={session} />
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
