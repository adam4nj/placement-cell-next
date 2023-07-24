import { db } from "@/lib/db";

import {
  RegisterFormType,
  firstName,
  lastName,
  registerFormSchema,
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
  const { role, email, username, password } = registerFormSchema.parse(body);

  const exists = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (exists) {
    throw new Error("Email already exists");
  }

  try {
    const companyUser = await db.user.create({
      data: {
        role,
        email,
        username,
        password,
        company: {
          create: {
            companyName: username,
            email: email,
            status: "Pending",
          },
        },
      },
    });
    return companyUser;
  } catch (e) {
    throw e;
  }
};
