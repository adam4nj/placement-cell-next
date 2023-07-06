import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getAllNotifications } from "@/actions/notifications";
import Link from "next/link";
import EditNotifButton from "@/components/notification/editNotifButton";
import DeleteNotifButton from "@/components/notification/deleteNotifButton";
import { NotificationWithDate } from "@/lib/validators/notification";

const NotificationsData = async () => {
  const notifications = (await getAllNotifications()) as NotificationWithDate[];
  return (
    <div>
      Notifications
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Notification</TableHead>
            <TableHead>Link</TableHead>
            <TableHead>Edit</TableHead>
            <TableHead className="text-right">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!notifications || notifications.length === 0 ? (
            <TableRow></TableRow>
          ) : (
            notifications.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>
                  <b>{item.title}</b>
                  <br />
                  {item.content}
                </TableCell>
                <TableCell>
                  {!item.link ? (
                    "Link not found"
                  ) : (
                    <Link href={item.link}>{item.link}</Link>
                  )}
                </TableCell>
                <TableCell>
                  <EditNotifButton data={item} />
                </TableCell>
                <TableCell className="text-right">
                  <DeleteNotifButton id={item.id} title={item.title} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default NotificationsData;
