import { z } from "zod";
import { DateRange } from "react-day-picker";

const DateRange: z.ZodType<DateRange> = z.any();

export const newJobSchema = z.object({
  title: z.string(),
  type: z.enum(["Job", "Internship"]),
  location: z.string().optional(),
  salary: z.coerce.number().optional(),
  details: z.string().optional(),
  date: DateRange.optional(),
});

export type NewJob = z.infer<typeof newJobSchema>;

export const jobSchema = z
  .object({
    jobId: z.string(),
  })
  .merge(newJobSchema);

export type Job = z.infer<typeof jobSchema>;

export const JobType = ["Job", "Internship"] as const;
