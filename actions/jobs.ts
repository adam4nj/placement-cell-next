"use server";

import { jobSchema, type Job } from "@/lib/validators/job";
import { Prisma, Status } from "@prisma/client";
import { db } from "@/lib/db";
import { deleteJobFromDb } from "@/lib/job";
import { revalidatePath } from "next/cache";

import { getUser } from "@/lib/auth";
import {
  StudentProfileType,
  studentProfileSchema,
} from "@/lib/validators/profile";

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

export async function getStudent() {
  const session = await getUser();

  const student = await db.student.findFirst({
    where: {
      userId: session?.user.id,
    },
  });
  return student!;
}

export type StudentDBType = Prisma.PromiseReturnType<typeof getStudent>;

export async function editJob(data: Job) {
  const { jobId, title, type, location, salary, details } =
    jobSchema.parse(data);
  const job = await db.job.update({
    where: {
      jobId: jobId,
    },
    data: {
      title,
      type,
      location,
      salary,
      details,
    },
  });

  revalidatePath("/dashboard/company/jobs");

  return job;
}

export async function deleteJob(id: string) {
  await deleteJobFromDb(id);
  revalidatePath("/dashboard/company/jobs");
}

export const hasAppliedJob = async (id: string, userId: string) => {
  const hasApplied = await db.jobApplication.findFirst({
    where: {
      jobId: id,
      student: {
        userId: userId,
      },
    },
  });
  return !!hasApplied;
};

export const hasAppliedInternship = async (id: string, userId: string) => {
  const hasApplied = await db.internApplication.findFirst({
    where: {
      jobId: id,
      student: {
        userId: userId,
      },
    },
  });
  return !!hasApplied;
};

export const changeJobAppStatus = async (jobAppId: string, status: Status) => {
  await db.jobApplication.update({
    where: {
      jobAppId,
    },
    data: {
      status: status,
    },
  });

  revalidatePath("/dashboard/company/jobs");

  return { jobAppId };
};

export const getStudentJobs = async () => {
  const user = await getUser();
  const appliedJobs = await db.jobApplication.findMany({
    where: {
      student: {
        userId: user?.user.id,
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

export const getAllJobApplications = async () => {
  const session = await getUser();

  const allapps = await db.jobApplication.findMany({
    where: {
      job: {
        company: {
          userId: session?.user.id,
        },
      },
    },
    include: {
      job: true,
      student: {
        select: {
          fName: true,
          lName: true,
        },
      },
    },
  });

  return allapps;
};

export const getAllInternApplications = async () => {
  const session = await getUser();
  const allapps = await db.internApplication.findMany({
    where: {
      job: {
        company: {
          userId: session?.user.id,
        },
      },
    },
    include: {
      job: true,
      student: {
        select: {
          fName: true,
          lName: true,
        },
      },
    },
  });

  return allapps;
};

export const deleteJobApplication = async (id: string) => {
  const deletejobapp = db.jobApplication.delete({
    where: {
      jobAppId: id,
    },
  });
  revalidatePath("/dashboard/student");
  return deletejobapp;
};

// User Profile

export const editProfile = async (data: StudentProfileType) => {
  const session = await getUser();
  const { fName, lName, address, email, district, state, pin, phone } =
    studentProfileSchema.parse(data);
  const { success } = studentProfileSchema.safeParse(data);
  try {
    if (!!session) {
      const studentdata = await db.student.update({
        where: {
          userId: session?.user.id,
        },
        data: {
          fName,
          lName,
          address,
          email,
          district,
          state,
          pin,
          phone,
        },
      });
      console.log(studentdata, success);
      return studentdata;
    }
  } catch {
    throw new Error("There was a problem");
  }
};
