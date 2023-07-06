import { z } from "zod";

export const newNotificationSchema = z.object({
  title: z.string(),
  content: z.string(),
  link: z.union([z.literal(""), z.string().trim().url()]).optional(),
  createdAt: z.date(),
});

export type NewNotification = z.infer<typeof newNotificationSchema>;

const notificationId = z.object({
  id: z.string(),
});

export const notificationSchema = notificationId.merge(newNotificationSchema);

export type Notification = z.infer<typeof notificationSchema>;
