"use server";

import { db } from "@/lib/db";
import { Status } from "@prisma/client";
import { RegisterFormType } from "@/lib/validators/register";
import { registerCompany, registerStudent } from "@/lib/user";

export async function registerStudentAction(body: RegisterFormType) {
  await registerStudent(body);
}

export async function registerCompanyAction(body: RegisterFormType) {
  await registerCompany(body);
}

export async function changeStatus(input: RegisterFormType, status: Status) {
  await db.user.update({
    where: {
      email: input.email,
    },
    data: {
      status: status,
    },
  });

  return { input, status };
}
