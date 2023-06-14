"use server";

import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { addNotification, getAllNotifications } from "@/lib/notifications";
import { revalidatePath } from "next/cache";

export async function getAll() {
  const notifications = await getAllNotifications();
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
