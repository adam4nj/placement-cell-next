import { NotificationWithDate } from "@/lib/validators/notification";
import { Notification } from "@prisma/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { Separator } from "../ui/separator";

dayjs.extend(relativeTime);

type NotificationCardProps = {
  notification: NotificationWithDate;
};

export function NotificationCard({ notification }: NotificationCardProps) {
  return (
    <div className="ml-2 space-y-1">
      <div className="flex flex-row justify-between">
        <Link
          href={`/notifications/${notification.id}`}
          className="text-left text-sm font-medium"
        >
          {notification.title}
        </Link>
        <p className="text-sm font-light">
          {dayjs(JSON.parse(JSON.stringify(notification.createdAt))).fromNow()}
        </p>
      </div>
      <Separator />
    </div>
  );
}
