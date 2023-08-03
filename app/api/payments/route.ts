import { getUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { internSchema } from "@/lib/validators/intern";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY!,
  key_secret: process.env.RAZORPAY_SECRET,
});

export async function POST(req: Request) {
  const body = await req.json();

  const session = await getUser();

  const { internappId, internapp } = internSchema.parse(body);

  if (!session?.user) return new NextResponse("Unauthorized");

  const payment_db = await db.payments.create({
    data: {
      intern: {
        connect: {
          internappId,
          internapp: {
            studentId: internapp.student.studentId,
          },
        },
      },
    },
  });

  if (!internapp.job.salary) {
    return new NextResponse("Free Internship");
  }

  await razorpay.paymentLink.create({
    amount: internapp.job.salary,
    currency: "INR",
    accept_partial: true,
    expire_by: 1691097057,
    reference_id: payment_db.id,
    customer: {
      name: internapp.job.company.companyName,
      email: internapp.job.company.email,
      contact: internapp.job.company.phone,
    },
    notify: {
      sms: true,
      email: true,
    },
    reminder_enable: true,
  });

  return NextResponse.json("OK");
}
