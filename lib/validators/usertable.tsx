import { z } from "zod";

enum Status {
  accepted = "Accepted",
  pending = "Pending",
  rejected = "Rejected",
}

export const userSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  role: z.enum(["STUDENT", "COMPANY", "ADMIN"]),
  email: z.string().email("Invalid Email"),
  username: z.string().min(1, {
    message: "Username not found",
  }),
  status: z.nativeEnum(Status),
});

export type User = z.infer<typeof userSchema>;
