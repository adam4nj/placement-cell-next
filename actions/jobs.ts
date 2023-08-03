"use server";

import {
  jobSchema,
  type Job,
  newJobSchema,
  NewJob,
} from "@/lib/validators/job";
import { Prisma, Status } from "@prisma/client";
import { db } from "@/lib/db";
import { deleteJobFromDb } from "@/lib/job";
import { revalidatePath } from "next/cache";

import { getUser } from "@/lib/auth";
import {
  StudentProfileType,
  studentProfileSchema,
} from "@/lib/validators/profile";
import { Session } from "next-auth";

export async function getAllPosts(search?: string) {
  if (search) {
    const posts = await db.job.findMany({
      where: {
        OR: [
          {
            title: {
              search: search ?? "",
            },
            details: {
              search: search ?? "",
            },
          },
        ],
      },
      orderBy: {
        _relevance: {
          fields: ["title", "details"],
          search: search,
          sort: "desc",
        },
      },
      include: {
        company: true,
      },
    });

    return posts;
  } else {
    const allPosts = await db.job.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        company: true,
      },
    });
    return allPosts;
  }
}

export async function getCompanyJobs() {
  const session = await getUser();
  const allJobs = await db.job.findMany({
    where: {
      type: "Job",
      company: {
        userId: session?.user.id,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  revalidatePath("/dashboard/company/jobs");
  return allJobs;
}

export async function isDuplicate(date: Date | null) {
  const session = await getUser();

  if (date) {
    const duplicate =
      (await db.jobApplication.findFirst({
        where: {
          student: {
            userId: session?.user.id,
          },
          job: {
            driveDate: date,
          },
        },
      })) ||
      (await db.internApplication.findFirst({
        where: {
          student: {
            userId: session?.user.id,
          },
          job: {
            driveDate: date,
          },
        },
      }));
    return !!duplicate;
  }
}

export async function getCompanyInternships() {
  const session = await getUser();
  const allJobs = await db.job.findMany({
    where: {
      type: "Internship",
      company: {
        userId: session?.user.id,
      },
    },
  });
  revalidatePath("/dashboard/company/jobs");
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

export type StudentDBType = Prisma.PromiseReturnType<typeof getStudent>;

export async function createJob(session: Session | null, data: NewJob) {
  const { title, type, location, salary, details, date, driveDate } =
    newJobSchema.parse(data);

  if (date && session) {
    const job = await db.job.create({
      data: {
        title,
        type,
        location,
        salary,
        details,
        startDate: date.from,
        endDate: date.to,
        driveDate,
        company: {
          connect: {
            userId: session.user.id,
          },
        },
      },
    });
    revalidatePath("/dashboard/company/jobs");
    return job;
  }
}

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
      status,
    },
  });

  revalidatePath("/dashboard/company/jobs");

  return { jobAppId };
};

export const changeInternAppStatus = async (
  internAppId: string,
  status: Status
) => {
  const application = await db.internApplication.update({
    where: {
      internAppId,
    },
    data: {
      status,
    },
  });

  revalidatePath("/dashboard/company/jobs");

  if (application.status === "Accepted") {
    await db.intern.create({
      data: {
        internappId: application.internAppId,
      },
    }); //unique constraint error
  }

  return { internAppId };
};

export const getStudentJobs = async () => {
  const session = await getUser();
  const appliedJobs = await db.jobApplication.findMany({
    where: {
      student: {
        userId: session?.user.id,
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

export async function getInterns() {
  const session = await getUser();
  const interns = await db.intern.findMany({
    where: {
      internapp: {
        job: {
          company: {
            userId: session?.user.id,
          },
        },
      },
    },
    include: {
      internapp: {
        include: {
          job: {
            include: {
              company: true,
            },
          },
          student: true,
        },
      },
    },
  });

  return interns;
}

export async function getStudentInternships() {
  const session = await getUser();
  const myjobs = await db.intern.findMany({
    where: {
      internapp: {
        student: {
          userId: session?.user.id,
        },
      },
    },
  });
  return myjobs;
}

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

export async function getStudent() {
  const session = await getUser();

  const student = await db.student.findFirst({
    where: {
      userId: session?.user.id,
    },
  });
  return student!;
}
