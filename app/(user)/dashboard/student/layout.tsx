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

const sideBarItems = [
  {
    href: "/dashboard/student",
    title: "Overview",
  },
  {
    href: "/dashboard/student/profile",
    title: "Profile",
  },
  {
    href: "/dashboard/student/feedback",
    title: "Feedback",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default async function StudentLayout({ children }: SettingsLayoutProps) {
  const session = await getUser();
  if (!session || session.user.role !== "STUDENT") redirect("/api/auth/signin");

  return (
    <>
      <DesktopSidebar items={sideBarItems} />
      <MobileSidebar items={sideBarItems} />
      <div className="lg:pl-72 m-5">
        <div className="flex flex-row justify-between pt-5">
          <h6 className="mx-5 text-3xl font-black">
            Dashboard / <CurrentPath className="text-slate-600" />
          </h6>
          <div className="hidden sm:flex ml-auto items-center space-x-4">
            <span className="hidden sm:block">{session.user.name}</span>
            <ProfileNav session={session} />
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
