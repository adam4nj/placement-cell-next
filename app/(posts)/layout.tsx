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
    <>
      <Navbar />
      <div className="flex flex-col lg:divide-x lg:flex-row">
        <div className="container md:w-5/6 lg:w-3/4 space-y-3">
          <Search />
          {children}
        </div>

        <div className="container sm:w-[600px] md:w-[700px] lg:w-1/4 space-y-3">
          <span className="text-lg">Notifications</span>
          <Separator />
          <NotificationFeed />
        </div>
      </div>
    </>
  );
}
