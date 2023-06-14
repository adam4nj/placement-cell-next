import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

import {
  firstName,
  lastName,
  registerFormSchema,
  RegisterFormType,
} from "@/lib/validators/register";
import * as bcrypt from "bcrypt";
import { UniqueErrorAlert } from "@/components/uniqueError";

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

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const studentUser = await db.user.create({
      data: {
        role,
        email,
        username,
        password: hashedPassword,
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
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        console.log(
          "There is a unique constraint violation, a new user cannot be created with this email"
        );
        <UniqueErrorAlert />;
      }
    }
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

  const hashedPassword = await bcrypt.hash(password, 12);

  const companyUser = await db.user.create({
    data: {
      role,
      email,
      username,
      password: hashedPassword,
      company: {
        create: {
          companyName: name,
          email: email,
          status: "Pending",
        },
      },
    },
  });

  return { companyUser };
};
