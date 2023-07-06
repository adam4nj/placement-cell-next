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
import { Notification } from "@/lib/validators/notification";

const NotificationsPage = async () => {
  const notifications = (await getAllNotifications()) as Notification[];
  return (
    <div className="container w-full mx-auto py-10 space-y-4">
      <div className="flex sm:flex-row flex-col justify-between">
        <span className="text-2xl font-semibold mb-5">
          Posted Notifications
        </span>
        <AddNotifButton className="end-5 top-5" />
      </div>
      <div className="grid grid-cols-1 gap-4">
        {notifications.map((data) => (
          <div className="flex flex-row space-x-3">
            <Card className="w-full border border-slate-700 border-opacity-50">
              <CardHeader className="flex felx-col sm:flex-row  justify-between">
                <CardTitle>{data.title}</CardTitle>
                {dayjs(data.createdAt).format("DD/MM/YYYY")}
              </CardHeader>
              <CardContent>{data.content}</CardContent>
              <CardFooter>
                {data.link ? (
                  <Link href={data.link}>{data.link}</Link>
                ) : (
                  <span className="text-slate-500">No Link Provided</span>
                )}
              </CardFooter>
            </Card>
            <div>
              <div>
                <EditNotifButton data={data} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
