"use server";

import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import {
  jobSchema,
  type Job,
  JobApplication,
  jobApplicationSchema,
} from "@/lib/validators/job";
import { db } from "@/lib/db";
import {
  deleteJobFromDb,
  getJobFromDb,
  getJobsFrmDb,
  createJobApplication,
} from "@/lib/job";
import { revalidatePath } from "next/cache";

export async function getAllJobs() {
  const jobs = await getJobsFrmDb();
  return jobs;
}

export async function getCurrentJob(id: string) {
  const job = await getJobFromDb(id);
  return job;
}

export async function createJob(data: Job) {
  const { title, location, salary, details } = await jobSchema.parseAsync(data);
  const job = await db.job.create({
    data: {
      title,
      location,
      salary,
      details,
    },
  });
  revalidatePath("/company/dashboard/jobs");

  return { job };
}

export async function editJob(data: Job) {
  const { jobId, title, location, salary, details } =
    await jobSchema.parseAsync(data);
  const job = db.job.update({
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

  revalidatePath("/company/dashboard/jobs");

  return job;
}

export async function deleteJob(id: string) {
  await deleteJobFromDb(id);
  revalidatePath("/company/dashboard/jobs");
}

export async function applyJob(id: string) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  if (userId) {
    const applyJob = await createJobApplication(id, userId);
    return applyJob;
  }
}
