import { notFound } from "next/navigation";
import { getAllNotifications } from "@/actions/notifications";
import { NotificationWithDate } from "@/lib/validators/notification";
import { NotificationCard } from "@/components/notification/notificationCard";
import { ScrollArea } from "@/components/ui/scroll-area";

  const NotificationFeed = async () => {
  const notifications = (await getAllNotifications()) as NotificationWithDate[];

  if (!notifications) return notFound();

  return (
    <ScrollArea>
      <ul className="grid grid-cols-1 gap-2">
        {notifications.map((item, index) => {
          if (index === notifications.length - 1) {
            // Add a ref to the last post in the list
            return (
              <li key={item.id}>
                <NotificationCard key={item.id} notification={item} />
              </li>
            );
          } else {
            return <NotificationCard key={item.id} notification={item} />;
          }
        })}
      </ul>
    </ScrollArea>
  );
};

export default NotificationFeed
