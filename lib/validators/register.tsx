import * as z from "zod";

export const registerFormSchema = z
  .object({
    role: z.enum(["STUDENT", "COMPANY"]),
    email: z
      .string()
      .email("Invalid Email")
      .min(1, { message: "Email is Required" }),
    username: z.string().min(8, {
      message: "Username must be at least 8 characters.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z
      .string()
      .min(1, { message: "Password confirmation is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type RegisterFormType = z.infer<typeof registerFormSchema>;
