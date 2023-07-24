import { Status, UserType } from "@prisma/client";
import type { User } from "next-auth";
import "next-auth/jwt";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    role: UserType;
    username: string;
    status: Status;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      role: UserType;
      username: string;
      status: Status;
    };
  }
}
