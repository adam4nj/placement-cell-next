import { db } from "@/lib/db";
import { registerFormSchema } from "@/lib/validators/auth";
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
    return new NextResponse("Email already exists");
  }

  const user = await db.user.create({
    data: {
      role,
      email,
      username,
      password,
    },
  });

  return NextResponse.json({
    user: {
      email: user.email,
    },
  });
}
