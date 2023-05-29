import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const JobsPage = async () => {
  //const jobs = await db.job.findMany();
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") redirect("api/auth/signin");

  return JSON.stringify(session);
};

export default JobsPage;
