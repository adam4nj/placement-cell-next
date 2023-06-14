import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { userSchema } from "@/lib/validators/usertable";

export async function POST(req: Request) {
  const body = await req.json();

  const { email, status } = userSchema.parse(body);

  const user = await db.user.update({
    where: {
      email: email,
    },
    data: {
      status: status,
    },
  });

  return NextResponse.json({
    user: {
      email: user.email,
      status: user.status,
    },
  });
}
