"use server";

import { db } from "@/lib/db";
import { Status } from "@prisma/client";
import { RegisterFormType } from "@/lib/validators/auth";
import { registerCompany, registerStudent } from "@/lib/user";
import * as bcrypt from "bcrypt";
import { User } from "@/lib/validators/usertable";
import { revalidatePath } from "next/cache";

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

export async function changeStatus(id: string, status: Status) {
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
