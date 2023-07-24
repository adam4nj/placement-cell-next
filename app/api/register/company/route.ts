import { db } from "@/lib/db";
import { registerFormSchema } from "@/lib/validators/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { name, phone, role, email, username, password } =
    registerFormSchema.parse(body);

  const exists = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (exists) {
    throw new Error("Email already exists");
  }

  // work on response codes

  try {
    await db.user.create({
      data: {
        name,
        phone,
        role,
        email,
        username,
        password,
        company: {
          create: {
            companyName: name,
            phone,
            email: email,
            status: "Pending",
          },
        },
      },
    });
    return NextResponse.json("OK");
  } catch (e) {
    throw e;
  }
}
