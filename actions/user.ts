"use server";

import { db } from "@/lib/db";
import { Status } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { User } from "@/lib/validators/usertable";
import { revalidatePath } from "next/cache";
import {
  Feedback,
  JobFeedback,
  feedbackSchema,
  jobFeedbackSchema,
} from "@/lib/validators/feedback";
import { Session } from "next-auth";
import { string } from "zod";

export async function bcryptHash(password: string) {
  const pw = await bcrypt.hash(password, 12);
  return pw;
}

export async function bcryptCompare(password: string, hash: string) {
  const pw = await bcrypt.compare(password, hash);
  return pw;
}

export async function verifiedUser(session: Session | null) {
  if (session) {
    const user = await db.user.findFirst({
      where: {
        id: session.user.id,
      },
    });

    return !!user?.verifyDoc;
  }

  return;
}

export async function getUserStatus(session: Session | null) {
  const user = await db.user.findFirst({
    where: {
      id: session?.user.id,
    },
  });
  if (user) return user.status;
}

export async function changeUserStatus(id: string, status: Status) {
  await db.user.update({
    where: {
      id,
    },
    data: {
      status: status,
    },
  });

  revalidatePath("/dashboard/admin/users");

  return { id, status };
}

export async function sendFeedback(id: string, body: Feedback) {
  const { subject, feedback, rating } = feedbackSchema.parse(body);
  await db.feedback.create({
    data: {
      subject,
      feedback,
      rating,
      student: {
        connect: {
          userId: id,
        },
      },
    },
  });
}

export async function sendJobFeedback(
  student: string,
  company: string,
  body: JobFeedback
) {
  const { job, feedback, rating } = jobFeedbackSchema.parse(body);
  await db.jobFeedback.create({
    data: {
      job,
      feedback,
      rating,
      student: {
        connect: {
          userId: student,
        },
      },
      company: {
        connect: {
          companyId: company,
        },
      },
    },
  });
}

export async function getCompanyFeedback(userId?: string) {
  const feedbacks = await db.jobFeedback.findMany({
    where: {
      company: {
        userId,
      },
    },
  });
  return feedbacks;
}

export async function getFeedback() {
  const feedback = await db.feedback.findMany();
  return feedback;
}

export async function deleteJobFeedback(id: string) {
  const feedback = await db.jobFeedback.delete({
    where: {
      id,
    },
  });
  revalidatePath("/dashboard/company/feedback");
  return feedback;
}

export async function deleteFeedback(id: string) {
  const feedback = await db.feedback.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard/admin/feedback");

  return feedback;
}
