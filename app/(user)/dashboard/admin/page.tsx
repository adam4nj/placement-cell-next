import { db } from "@/lib/db";
import { DataTable } from "@/components/dataTable";
import { columns } from "./users/columns";
const AdminPage = async () => {
  const userData = await db.user.findMany();

  return (
    <div className="container w-full mx-auto py-10">
      <DataTable columns={columns} data={userData} />
    </div>
  );
};

export default AdminPage;
