import { db } from "@/lib/db";
import { firstName, lastName, registerFormSchema } from "@/lib/validators/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { name, phone, role, email, username, password } =
    registerFormSchema.parse(body);

  const parsedFirstName = firstName.parse(name);

  const parsedLastName = lastName.parse(name);

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
        role,
        email,
        phone,
        username,
        password,
        name,
        student: {
          create: {
            fName: parsedFirstName,
            lName: parsedLastName,
            phone,
            email,
            regId: username,
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
