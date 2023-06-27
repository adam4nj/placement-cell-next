"use server";

import { getUser } from "@/lib/auth";

import { jobSchema, type Job } from "@/lib/validators/job";
import { db } from "@/lib/db";
import { deleteJobFromDb, createJobApplication } from "@/lib/job";
import { revalidatePath } from "next/cache";

export async function getAllJobs() {
  const allJobs = await db.job.findMany({
    include: {
      company: true,
    },
  });
  return allJobs;
}

export async function getCurrentJob(id: string) {
  const currentJob = await db.job.findUnique({
    where: {
      jobId: id,
    },
    include: {
      company: true,
    },
  });
  return currentJob;
}

export async function getStudent(id?: string) {
  const student = await db.student.findUnique({
    where: {
      userId: id,
    },
  });
  return student;
}

export async function editJob(data: Job) {
  const { jobId, title, location, salary, details } = jobSchema.parse(data);
  const job = await db.job.update({
    where: {
      jobId: jobId,
    },
    data: {
      title,
      location,
      salary,
      details,
    },
  });

  revalidatePath("/company/dashboard/job");

  return job;
}

export async function deleteJob(id: string) {
  await deleteJobFromDb(id);
  revalidatePath("/company/dashboard/job");
}

export async function applyJob(id: string) {
  const session = await getUser();
  const userId = session?.user.id;
  if (userId) {
    const applyJob = await createJobApplication(id, userId);
    return applyJob;
  }
}
