import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
const prisma = new PrismaClient();
async function main() {
  const password = await hash("test", 12);
  const adam = await prisma.user.upsert({
    where: { username: "adamnj" },
    update: {},
    create: {
      id: "1",
      email: "adam@prisma.io",
      name: "Adam",
      username: "adamnj",
      password,
      role: "STUDENT",
    },
  });
  console.log({ adam });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
