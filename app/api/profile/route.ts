import { getUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { studentProfileSchema } from "@/lib/validators/profile";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function PATCH(req: Request) {
  const body = await req.json();
  const session = await getUser();
  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    const { fName, lName, address, email, district, state, pin, phone } =
      studentProfileSchema.parse(body);

    const student = await db.student.findFirst({
      where: {
        userId: session.user.id,
      },
    });

    if (!student) {
      return new NextResponse("Please register to update the profile", {
        status: 403,
      });
    }

    await db.student.update({
      where: {
        userId: session.user.id,
      },
      data: {
        fName,
        lName,
        address,
        email,
        district,
        state,
        pin,
        phone,
      },
    });

    return new NextResponse("OK");
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new NextResponse(err.message, { status: 400 });
    }

    return new NextResponse("Could not update your profile. Please try later", {
      status: 500,
    });
  }
}
