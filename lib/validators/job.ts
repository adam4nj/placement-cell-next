import { z } from "zod";
import { DateRange } from "react-day-picker";

const DateRange: z.ZodType<DateRange> = z.any();

export const newJobSchema = z.object({
  title: z.string().min(1, {
    message: "Please provide a title!",
  }),
  type: z.enum(["Job", "Internship"]),
  location: z.string().optional(),
  salary: z.coerce.number().optional(),
  details: z.string().optional(),
  date: DateRange.optional(),
  driveDate: z.date().optional(),
});

export type NewJob = z.infer<typeof newJobSchema>;

export const jobSchema = z
  .object({
    jobId: z.string(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
  })
  .merge(newJobSchema);

export type Job = z.infer<typeof jobSchema>;

export const JobType = ["Job", "Internship"] as const;
