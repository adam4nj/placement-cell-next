import { z } from "zod";

import { getUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { newJobSchema } from "@/lib/validators/job";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, type, location, salary, details, date } =
      newJobSchema.parse(body);

    const session = await getUser();

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (date) {
      await db.job.create({
        data: {
          title,
          type,
          location,
          salary,
          details,
          startDate: date.from,
          endDate: date.to,
          company: {
            connect: {
              userId: session.user.id,
            },
          },
        },
      });
    }

    return new NextResponse("OK");
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new NextResponse(err.message, { status: 422 });
    }
    console.log(req.json);
    return new NextResponse(
      "Could not create the given job. Please try again..",
      { status: 500 }
    );
  }
}
