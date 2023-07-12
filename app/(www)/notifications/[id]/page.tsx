import { getCurrentNotification } from "@/actions/notifications";
import { Separator } from "@/components/ui/separator";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Metadata } from "next"; // metadata
import Link from "next/link";
import { notFound } from "next/navigation";

dayjs.extend(relativeTime);

export const revalidate = 10;

interface NotificationParams {
  params: {
    id: string;
  };
}

export default async function Page({ params: { id } }: NotificationParams) {
  const notification = await getCurrentNotification(id);

  if (!notification) return notFound();

  return (
    <div className="space-y-4 py-5">
      <h1 className="text-3xl">Notification Details</h1>

      <section
        key={notification.id}
        className="container py-10 flex flex-col  border rounded-lg"
      >
        <div className="flex flex-col-reverse gap-2 md:flex-row justify-between">
          <h2 className="text-xl md:text-4xl font-extrabold">
            {notification.title}
          </h2>
          <p className="text-xs md:text-sm opacity-70">
            {dayjs(
              JSON.parse(JSON.stringify(notification.createdAt))
            ).fromNow()}
          </p>
        </div>
        <Separator className="my-5" />
        <div className="space-y-4">
          <p className="text-base md:text-lg font-medium">
            {notification.content}
          </p>
          {notification.link && (
            <Link href={notification.link} className="text-lg font-medium">
              {notification.link}
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
