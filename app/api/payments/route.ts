import { getUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { studentInternApplicationSchema } from "@/lib/validators/job-application";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY!,
  key_secret: process.env.RAZORPAY_SECRET,
});

export async function POST(req: Request) {
  const body = req.json();

  const session = await getUser();

  const { internappId, salary, job } =
    studentInternApplicationSchema.parse(body);

  if (!session?.user) return new NextResponse("Unauthorized");

  const payment_db = await db.payments.create({
    data: {
      intern: {
        connect: {
          internappId,
          internapp: {
            student: {
              userId: session.user.id,
            },
          },
        },
      },
    },
  });

  const payment = await razorpay.paymentLink.create({
    amount: salary,
    currency: "INR",
    accept_partial: true,
    expire_by: 1691097057,
    reference_id: payment_db.id,
    customer: {
      name: job.company.companyName,
      email: job.company.email,
      contact: job.company.phone,
    },
    notify: {
      sms: true,
      email: true,
    },
    reminder_enable: true,
  });

  await db.payments.update({
    where: {
      id: payment_db.id,
    },
    data: {
      paymentLinkId: payment.id,
    },
  });

  return NextResponse.json("OK");
}
