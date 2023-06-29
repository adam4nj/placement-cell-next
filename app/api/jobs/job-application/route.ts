import { z } from "zod";
import { db } from "@/lib/db";
import { getUser } from "@/lib/auth";
import { jobApplicationSchema } from "@/lib/validators/job";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const body = await req.json();

    const { jobId } = jobApplicationSchema.parse(body);

    const session = await getUser();

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await db.jobApplication.findMany({
      where: {
        jobId: jobId,
        //resume
      },
    });
  } catch (err) {
    return new NextResponse("Could not find any jobs. Please try again..", {
      status: 500,
    });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const {
      jobId,
      studentId, //resume
    } = jobApplicationSchema.parse(body);

    const session = await getUser();

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await db.jobApplication.create({
      data: {
        jobId: jobId,
        studentId: studentId,
        //resume
      },
    });

    return new NextResponse("OK");
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new NextResponse(err.message, { status: 422 });
    }

    return new NextResponse(
      "Could not apply the given job. Please try again..",
      { status: 500 }
    );
  }
}
