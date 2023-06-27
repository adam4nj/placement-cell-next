import { z } from "zod";
import { DateRange } from "react-day-picker";

export const jobSchema = z.object({
  jobId: z.string(),
  title: z.string(),
  location: z.string().optional(),
  salary: z.coerce.number().optional(),
  details: z.string().optional(),
});

export type Job = z.infer<typeof jobSchema>;

const DateRange: z.ZodType<DateRange> = z.any();

export const newJobSchema = z.object({
  title: z.string(),
  location: z.string().optional(),
  salary: z.coerce.number().optional(),
  details: z.string().optional(),
  date: DateRange.optional(),
});

export type NewJob = z.infer<typeof newJobSchema>;

export const jobApplicationSchema = z.object({
  jobId: z.string(),
  studentId: z.string(),
});

export type JobApplicationType = z.infer<typeof jobApplicationSchema>;
