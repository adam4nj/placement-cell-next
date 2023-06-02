import { db } from "@/lib/db";
import { registerFormSchema } from "@/lib/validators/register";
import { hash } from "bcrypt";
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

  const hashedPassword = await hash(password, 12);

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
