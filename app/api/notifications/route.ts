import { db } from "@/lib/db";
import { notificationSchema } from "@/lib/validators/notification";
import { getUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, content, link } = notificationSchema.parse(body);

    const session = await getUser();

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await db.notification.create({
      data: {
        title,
        content,
        link,
        userId: session.user.id,
      },
    });

    return new NextResponse("OK");
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new NextResponse(err.message, { status: 422 });
    }

    return new NextResponse(
      "Could not post the given notification. Please try again..",
      { status: 500 }
    );
  }
}
