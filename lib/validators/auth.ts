import * as z from "zod";

export const registerFormSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    role: z.enum(["STUDENT", "COMPANY"]),
    phone: z.string().regex(/^\d+$/),
    email: z
      .string()
      .email("Invalid Email")
      .min(1, { message: "Email is Required" }),
    username: z.string().min(8, {
      message: "Username must be at least 8 characters.",
    }),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .regex(
        /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,16}$/
      ),
    confirmPassword: z
      .string()
      .min(1, { message: "Password confirmation is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type RegisterFormType = z.infer<typeof registerFormSchema>;

export const firstName = z
  .string()
  .transform((val) => val.split(" ")[0])
  .pipe(z.string().trim());
export const lastName = z
  .string()
  .transform((val) => val.split(" ")[1])
  .pipe(z.string().trim());

export const loginFormSchema = z.object({
  role: z.enum(["STUDENT", "COMPANY"]),

  username: z.string().min(8, {
    message: "Username must be at least 8 characters.",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .regex(
      /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,16}$/
    ),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;
