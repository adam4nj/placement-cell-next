import { Metadata } from "next";

import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
};

const sidebarItems = [
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
        <div className="flex flex-col px-10 space-y-6 lg:flex-row lg:space-x-12 lg:space-y-0">
          <div className="w-full">
            <div className="flex flex-row justify-between">
              <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
                <p className="text-muted-foreground">
                  Manage your account settings and set e-mail preferences.
                </p>
              </div>
            </div>

            <Separator className="my-6" />
            <div className="w-4/5">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
