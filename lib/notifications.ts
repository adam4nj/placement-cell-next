import { db } from "./db";

interface notificationProps {
  title: string;
  content: string;
  userId: string;
}

export const getAllNotifications = async () => {
  const notification = await db.notification.findMany();
  return notification;
};

export const addNotification = async (
  title: string,
  content: string,
  userId: string
) => {
  const notifications = await db.notification.create({
    data: {
      title,
      content,
      userId,
    },
  });

  return notifications;
};
