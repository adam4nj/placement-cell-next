"use server";

import { db } from "@/lib/db";
import { Status } from "@prisma/client";
import { RegisterFormType } from "@/lib/validators/auth";
import { registerCompany, registerStudent } from "@/lib/user";
import * as bcrypt from "bcrypt";

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
