import { z } from "zod";

export const jobApplicationSchema = z.object({
  jobAppId: z.string(),
  title: z.string(),
  company: z.string(),
  createdAt: z.date(),
  status: z.boolean(),
});

export type JobApplicationType = z.infer<typeof jobApplicationSchema>;
