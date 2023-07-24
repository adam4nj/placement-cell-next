import { z } from "zod";

import { getUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY!,
  key_secret: process.env.RAZORPAY_SECRET,
});

export async function POST(req: Request) {
  try {
    const session = await getUser();

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (session) {
      const student = await db.student.findFirst({
        where: {
          userId: session.user.id,
        },
      });
      await razorpay.customers.create({
        name: session.user.name!,
        email: session.user.email!,
        contact: student?.phone!,
      });
      return new NextResponse("OK");
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new NextResponse(err.message, { status: 422 });
    }
    console.log(req.json);
    return new NextResponse(
      "Could not process the payment. Please try again..",
      { status: 500 }
    );
  }
}
