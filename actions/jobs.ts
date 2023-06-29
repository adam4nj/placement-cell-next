"use server";

import { jobSchema, type Job } from "@/lib/validators/job";
import { db } from "@/lib/db";
import { deleteJobFromDb } from "@/lib/job";
import { revalidatePath } from "next/cache";
import { jobApplicationSchema } from "@/lib/validators/job-application";

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

export const isApplied = async (id: string, userId: string) => {
  const hasApplied = await db.jobApplication.findFirst({
    where: {
      jobId: id,
      student: {
        userId: userId,
      },
    },
  });
  revalidatePath("/jobs/[jobId]");
  return !!hasApplied;
};

export const getStudentJobs = async (userId: string) => {
  const appliedJobs = await db.jobApplication.findMany({
    where: {
      student: {
        userId: userId,
      },
    },
    include: {
      job: {
        include: {
          company: true,
        },
      },
    },
  });

  return appliedJobs;
};

export const editJobApplication = async () => {};

export const deleteJobApplication = async (id: string) => {
  const deletejob = db.jobApplication.delete({
    where: {
      jobAppId: id,
    },
  });
  return deletejob;
};
