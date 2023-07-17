"use server";

import { db } from "@/lib/db";
import { Status } from "@prisma/client";
import { RegisterFormType } from "@/lib/validators/auth";
import { registerCompany, registerStudent } from "@/lib/user";
import * as bcrypt from "bcrypt";
import { User } from "@/lib/validators/usertable";
import { revalidatePath } from "next/cache";
import { Feedback, feedbackSchema } from "@/lib/validators/feedback";

export async function bcryptHash(password: string) {
  const pw = await bcrypt.hash(password, 12);
  return pw;
}

export async function bcryptCompare(password: string, hash: string) {
  const pw = await bcrypt.compare(password, hash);
  return pw;
}

export async function registerStudentAction(body: RegisterFormType) {
  await registerStudent(body);
}

export async function registerCompanyAction(body: RegisterFormType) {
  await registerCompany(body);
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

export async function getFeedback() {
  const feedbacks = await db.feedback.findMany();
  return feedbacks;
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
