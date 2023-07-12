import { Metadata } from "next";
import { DesktopSidebar } from "@/components/dashboard/student/desktopSidebar";
import { AddJob } from "@/components/job/addJob";
import { MobileSidebar } from "@/components/dashboard/student/mobileSidebar";

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

export default function CompanyLayout({ children }: CompanyLayoutProps) {
  return (
    <>
      <DesktopSidebar items={sidebarItems} />
      <MobileSidebar items={sidebarItems} />
      <AddJob />
      <div className="lg:pl-72 m-5">{children}</div>
    </>
  );
}
