import { Notification } from "@prisma/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type NotificationCardProps = {
  notification: Notification;
};

export function NotificationCard({ notification }: NotificationCardProps) {
  return (
    <div className="ml-2 space-y-1">
      <div className="flex flex-row justify-between">
        <p className="text-sm text-left font-medium">{notification.title}</p>
        <p className="text-sm font-light">
          {dayjs(JSON.parse(JSON.stringify(notification.createdAt))).fromNow()}
        </p>
      </div>
      <p className="text-sm text-muted-foreground">{notification.content}</p>
    </div>
  );
}
