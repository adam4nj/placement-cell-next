import { Separator } from "@/components/ui/separator";
import Search from "@/components/searchBox";

import Navbar from "@/components/Nav";
import { NotificationFeed } from "@/components/notification/notificationFeed";

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex flex-col lg:flex-row lg:divide-x">
        <div className="container space-y-3 md:w-5/6 lg:w-3/4">{children}</div>

        <div className="container sticky my-5 space-y-3 sm:w-[600px] md:w-[700px] lg:w-1/4">
          <span className="text-lg font-extrabold">Notifications</span>
          <Separator />
          <NotificationFeed />
        </div>
      </div>
    </div>
  );
}
