import { db } from "@/lib/db";
import { registerFormSchema } from "@/lib/validators/auth";
import * as argon2 from "argon2";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { role, email, username, password } = registerFormSchema.parse(body);

  const exists = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (exists) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await argon2.hash(password);

  const user = await db.user.create({
    data: {
      role,
      email,
      username,
      password: hashedPassword,
    },
  });

  return NextResponse.json({
    user: {
      email: user.email,
    },
  });
}
