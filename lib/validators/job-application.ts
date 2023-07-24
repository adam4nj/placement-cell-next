import { z } from "zod";

export const studentJobApplicationSchema = z.object({
  jobAppId: z.string(),
  createdAt: z.date(),
  status: z.enum(["Accepted", "Rejected", "Pending"]),
  job: z.object({
    title: z.string(),
    company: z.object({
      companyName: z.string(),
    }),
  }),
});

export type StudentJobApplication = z.infer<typeof studentJobApplicationSchema>;

export const studentInternApplicationSchema = z.object({
  internappId: z.string(),
  createdAt: z.date(),
  salary: z.number(),
  status: z.enum(["Accepted", "Rejected", "Processing", "Pending"]),
  job: z.object({
    title: z.string(),
    company: z.object({
      companyName: z.string(),
      email: z.string().email(),
      phone: z.string(),
    }),
  }),
});

export const companyInternApplicationSchema = z.object({
  internAppId: z.string(),
  createdAt: z.date(),
  resume: z.string(),
  status: z.enum(["Accepted", "Rejected", "Processing", "Pending"]),
  job: z.object({
    title: z.string(),
    salary: z.number().nullable(),
  }),
  student: z
    .object({
      fName: z.string(),
      lName: z.string().nullable(),
    })
    .nullable(),
});

export const companyJobApplicationSchema = z.object({
  jobAppId: z.string(),
  createdAt: z.date(),
  resume: z.string(),
  status: z.enum(["Accepted", "Rejected", "Processing", "Pending"]),
  job: z.object({
    title: z.string(),
    salary: z.number().nullable(),
  }),
  student: z
    .object({
      fName: z.string(),
      lName: z.string().nullable(),
    })
    .nullable(),
});

export type CompanyInternApplication = z.infer<
  typeof companyInternApplicationSchema
>;
export type CompanyJobApplication = z.infer<typeof companyJobApplicationSchema>;
