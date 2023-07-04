import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  role: z.enum(["STUDENT", "COMPANY", "ADMIN"]),
  email: z.string().email("Invalid Email"),
  username: z.string().min(1, {
    message: "Username not found",
  }),
  status: z.enum(["Accepted", "Pending", "Rejected"]),
});

export type User = z.infer<typeof userSchema>;

export const statusSchema = z.object({
  status: z.enum(["Accepted", "Pending", "Rejected"]),
});

export type StatusType = z.infer<typeof statusSchema>;
