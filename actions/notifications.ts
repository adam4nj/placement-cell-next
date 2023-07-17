"use server";

import { db } from "@/lib/db";
import {
  NewNotification,
  newNotificationSchema,
} from "@/lib/validators/notification";
import { revalidatePath } from "next/cache";

export const getAllNotifications = async () => {
  const notification = await db.notification.findMany();
  revalidatePath("dashboard/admin/notifications");
  revalidatePath("/jobs");
  return notification;
};

export const getCurrentNotification = async (id: string) => {
  const notification = await db.notification.findFirst({
    where: {
      id: id,
    },
  });
  return notification;
};

export async function editNotification(id: string, data: NewNotification) {
  const { title, content, link } = newNotificationSchema.parse(data);
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

export async function deleteNotification(id: string) {
  await db.notification.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/company/dashboard/notifications");
}
