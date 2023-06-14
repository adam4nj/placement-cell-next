import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { DataTable } from "@/components/dataTable";
import { User, columns } from "./columns";
const AdminPage = async () => {
  //const jobs = await db.job.findMany();
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "STUDENT") redirect("/api/auth/signin");

  const userData = await db.user.findMany();

  return (
    <>
      <div className="container w-full` mx-auto py-10">
        <DataTable columns={columns} data={userData} />
      </div>
    </>
  );
};

export default AdminPage;
