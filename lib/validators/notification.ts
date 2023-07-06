import { z } from "zod";

export const newNotificationSchema = z.object({
  title: z.string(),
  content: z.string(),
  link: z.union([z.literal(""), z.string().trim().url()]).optional(),
});

export type NewNotification = z.infer<typeof newNotificationSchema>;

const notificationId = z.object({
  id: z.string(),
});

const notificationDate = z.object({
  createdAt: z.date(),
});

export const notificationSchema = notificationId.merge(newNotificationSchema);

export const notificationWithDateSchema =
  notificationSchema.merge(notificationDate);

export type NotificationWithDate = z.infer<typeof notificationWithDateSchema>;

export type Notification = z.infer<typeof notificationSchema>;
