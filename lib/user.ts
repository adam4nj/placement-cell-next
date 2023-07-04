import { db } from "@/lib/db";
import { stripe } from "./_jobCheckout";

import {
  firstName,
  lastName,
  registerFormSchema,
  RegisterFormType,
} from "@/lib/validators/auth";

export const registerStudent = async (body: RegisterFormType) => {
  const { name, role, email, username, password } =
    registerFormSchema.parse(body);

  const parsedFirstName = firstName.parse(name);

  const parsedLastName = lastName.parse(name);

  const exists = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (exists) {
    throw new Error("Email already exists");
  }

  try {
    const studentUser = await db.user.create({
      data: {
        role,
        email,
        username,
        password,
        student: {
          create: {
            fName: parsedFirstName,
            lName: parsedLastName,
            email: email,
            regId: username,
            status: "Pending",
          },
        },
      },
    });
    return studentUser;
  } catch (e) {
    throw e;
  }
};

export const registerCompany = async (body: RegisterFormType) => {
  const { name, role, email, username, password } =
    registerFormSchema.parse(body);

  const exists = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (exists) {
    throw new Error("Email already exists");
  }

  const companyUser = await db.user.create({
    data: {
      role,
      email,
      username,
      password,
      company: {
        create: {
          companyName: name,
          email: email,
          status: "Pending",
        },
      },
    },
  });
  await stripe.customers.create({
    email,
    name,
  });

  return companyUser;
};
