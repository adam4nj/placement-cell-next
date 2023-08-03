import { z } from "zod";

export const internSchema = z.object({
  internId: z.string(),
  internappId: z.string(),
  internapp: z.object({
    job: z.object({
      title: z.string(),
      salary: z.number().nullable(),
      company: z.object({
        email: z.string(),
        phone: z.string(),
        companyName: z.string(),
      }),
    }),
    student: z.object({
      fName: z.string(),
      lName: z.string().nullable(),
      studentId: z.string(),
    }),
  }),
});

export type Intern = z.infer<typeof internSchema>;
