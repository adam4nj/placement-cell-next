import { z } from "zod";

export const studentProfileSchema = z.object({
  fName: z.string(),
  lName: z.string(),
  email: z
    .string()
    .email("Invalid Email")
    .min(1, { message: "Email is Required" }),
  address: z.string(),
  district: z.string(),
  state: z.string(),
  pin: z.coerce.number(),
  phone: z.string().regex(/^\d+$/),
});

export type StudentProfileType = z.infer<typeof studentProfileSchema>;

export const companyProfileSchema = z.object({
  companyName: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .email("Invalid Email")
    .min(1, { message: "Email is Required" }),
  address: z.string(),
  district: z.string(),
  state: z.string(),
  pin: z.string(),
});

export type CompanyProfileType = z.infer<typeof companyProfileSchema>;
