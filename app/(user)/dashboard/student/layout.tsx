import { Metadata } from "next";
import { DesktopSidebar } from "@/components/dashboard/student/desktopSidebar";

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
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function StudentLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <DesktopSidebar items={sideBarItems} />
      <div className="lg:pl-72 m-5">{children}</div>
    </>
  );
}
