import { z } from "zod";

export const jobSchema = z.object({
  jobId: z.string(),
  title: z.string(),
  location: z.string().optional(),
  salary: z.coerce.number().optional(),
  details: z.string().optional(),
});

export type Job = z.infer<typeof jobSchema>;

export const newJobSchema = z.object({
  title: z.string(),
  location: z.string().optional(),
  salary: z.coerce.number().optional(),
  details: z.string().optional(),
});

export type NewJob = z.infer<typeof newJobSchema>;

export const jobApplicationSchema = z.object({
  jobId: z.string(),
  userId: z.string(),
});

export type JobApplication = z.infer<typeof jobApplicationSchema>;
