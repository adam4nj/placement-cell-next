import { z } from "zod";

export const studentJobApplicationSchema = z.object({
  jobAppId: z.string(),
  createdAt: z.date(),
  job: z.object({
    title: z.string(),
    company: z.object({
      companyName: z.string(),
    }),
  }),
});

export type StudentJobApplication = z.infer<typeof studentJobApplicationSchema>;

export const companyJobApplicationSchema = z.object({
  jobAppId: z.string(),
  createdAt: z.date(),
  resume: z.string(),
  status: z.enum(["Accepted", "Rejected", "Pending"]),
  job: z.object({
    title: z.string(),
  }),
  student: z
    .object({
      fName: z.string(),
      lName: z.string().nullable(),
    })
    .nullable(),
});

export type CompanyJobApplication = z.infer<typeof companyJobApplicationSchema>;
