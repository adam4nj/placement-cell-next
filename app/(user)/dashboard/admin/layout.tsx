import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import { DesktopSidebar } from "@/components/dashboard/student/desktopSidebar";
import { ProfileNav } from "@/components/dashboard/profileNav";
import { MobileSidebar } from "@/components/dashboard/student/mobileSidebar";

export const metadata: Metadata = {
  title: "Admin - Dashboard",
  description: "Dashboard for admin in Placement JMC",
};

const sidebarItems = [
  {
    title: "Overview",
    href: "/dashboard/admin",
  },
  {
    title: "Users",
    href: "/dashboard/admin/users",
  },
  {
    title: "Jobs",
    href: "/dashboard/admin/jobs",
  },
  {
    title: "Notifications",
    href: "/dashboard/admin/notifications",
  },
  {
    title: "Payments",
    href: "/dashboard/admin/payments",
  },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await getUser();
  if (!session || session.user.role !== "STUDENT") redirect("/api/auth/signin");

  return (
    <>
      <DesktopSidebar items={sidebarItems} />
      <MobileSidebar items={sidebarItems} />
      <div className="lg:pl-72 m-5">
        <div className="flex justify-between">
          <h2 className="ml-5 text-4xl font-black pt-2">Dashboard</h2>
          <div className="ml-auto flex items-center space-x-4">
            <span className="hidden sm:block">{session.user.name}</span>
            <ProfileNav session={session} />
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
