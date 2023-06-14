import { db } from "./db";
import { Job } from "@/lib/validators/job";
import { cache } from "react";

export const preloadJobs = () => {
  void getJobsFrmDb();
};

export const getJobsFrmDb = cache(async () => {
  const jobs = await db.job.findMany();
  return jobs;
});

export const getJobFromDb = cache(async (id: string) => {
  const job = db.job.findUnique({
    where: {
      jobId: id,
    },
  });
  return job;
});

export const deleteJobFromDb = async (id: string) => {
  const deletejob = db.job.delete({
    where: {
      jobId: id,
    },
  });
  return deletejob;
};

export const createJobApplication = async (jobId: string, userId: string) => {
  const jobapplication = await db.jobApplication.create({
    data: {
      jobId: jobId,
      userId: userId,
    },
  });

  return jobapplication;
};
