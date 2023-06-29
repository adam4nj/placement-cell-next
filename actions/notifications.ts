import { db } from "@/lib/db";
import { addNotification } from "@/lib/notifications";
import { revalidatePath } from "next/cache";

export async function getAllNotifications() {
  const notifications = await db.notification.findMany();
  return notifications;
}

export async function addOne(title: string, content: string, userId: string) {
  const notification = await addNotification(title, content, userId);
  return notification;
}

export async function editOne(
  id: string,
  title: string,
  content: string,
  link: string
) {
  const editnotif = await db.notification.update({
    where: {
      id: id,
    },
    data: {
      title,
      content,
      link,
    },
  });

  revalidatePath("/company/dashboard/notifications");

  return editnotif;
}

export async function deleteOne(id: string) {
  await db.notification.delete({
    where: {
      id: id,
    },
  });
}
