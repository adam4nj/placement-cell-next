import AddNotifButton from "@/components/notification/addNotification";
import { getAllNotifications } from "@/actions/notifications";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dayjs from "dayjs";
import Link from "next/link";
import EditNotifButton from "@/components/notification/editNotifButton";
import { NotificationWithDate } from "@/lib/validators/notification";
import DeleteNotifButton from "@/components/notification/deleteNotifButton";

const NotificationsPage = async () => {
  const notifications = (await getAllNotifications()) as NotificationWithDate[];
  return (
    <div className="container w-full mx-auto py-10 space-y-4">
      <div className="flex sm:flex-row flex-col justify-between">
        <span className="text-2xl font-semibold mb-5">
          Posted Notifications
        </span>
        <AddNotifButton className="end-5 top-5" />
      </div>
      <div className="grid grid-cols-1 gap-4 py-5">
        {notifications.map((data) => (
          <div className="flex flex-row space-x-3" key={data.id}>
            <Card className="w-full border border-slate-700 border-opacity-50">
              <CardHeader className="flex flex-col sm:flex-row justify-between">
                <CardTitle>{data.title}</CardTitle>
                <span className="text-sm opacity-60">
                  {dayjs(data.createdAt).format("DD/MM/YYYY")}
                </span>
              </CardHeader>
              <CardContent className="text-sm">{data.content}</CardContent>
              <CardFooter className="text-sm">
                {data.link ? (
                  <Link href={data.link} target="_blank">
                    {data.link}
                  </Link>
                ) : (
                  <span className="text-slate-500">No Link Provided</span>
                )}
              </CardFooter>
            </Card>

            <div className="flex flex-col justify-evenly">
              <EditNotifButton data={data} />
              <DeleteNotifButton id={data.id} title={data.title} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
