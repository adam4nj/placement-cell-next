"use server";

import { getUser } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  NewNotification,
  newNotificationSchema,
} from "@/lib/validators/notification";
import { revalidatePath } from "next/cache";

export const getAllNotifications = async () => {
  const notification = await db.notification.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  revalidatePath("/dashboard/admin/notifications");
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

export async function addNotification(data: NewNotification) {
  const session = await getUser();
  if (session) {
    const note = await db.notification.create({
      data: {
        title: data.title,
        content: data.content,
        link: data.link,
        userId: session?.user.id,
      },
    });
    revalidatePath("/dashboard/company/notifications");

    return note;
  }
}

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

  revalidatePath("/dashboard/company/notifications");

  return editnotif;
}

export async function deleteNotification(id: string) {
  await db.notification.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/dashboard/company/notifications");
}
