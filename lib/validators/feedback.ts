import { z } from "zod";

export const feedbackSchema = z.object({
  subject: z.string().min(1, "Please provide a subject!"),
  feedback: z.string().min(1, "Please provide your feedback!"),
  rating: z.number(),
});

export type Feedback = z.infer<typeof feedbackSchema>;

export const jobFeedbackSchema = z.object({
  job: z.string(),
  to: z.string(),
  feedback: z.string().min(1, "Please provide your feedback!"),
  rating: z.number(),
});

export type JobFeedback = z.infer<typeof jobFeedbackSchema>;
