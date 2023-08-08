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
import { Separator } from "@/components/ui/separator";

const NotificationsPage = async () => {
  const notifications = (await getAllNotifications()) as NotificationWithDate[];
  return (
    <div className="container mx-auto w-full space-y-4 py-10">
      <div className="flex flex-col justify-between sm:flex-row">
        <span className="mb-5 text-2xl font-bold">Posted Notifications</span>
        <AddNotifButton className="end-5 top-5" />
      </div>
      <Separator className="my-5 bg-black" />

      <div className="grid grid-cols-1 gap-4 py-5">
        {notifications.map((data) => (
          <div className="flex flex-row space-x-3" key={data.id}>
            <Card className="w-full border-2 border-black">
              <CardHeader className="flex flex-col justify-between sm:flex-row">
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
