import { db } from "@/lib/db";
import { DataTable } from "@/components/dataTable";
import { columns } from "./columns";
import { Separator } from "@/components/ui/separator";

const UserDataPage = async () => {
  const userData = await db.user.findMany({
    where: {
      NOT: {
        role: "ADMIN",
      },
    },
  });

  return (
    <div className="w-full` container mx-auto py-10">
      <div>
        <span className="text-2xl font-bold">Users</span>
        <Separator className="my-5 bg-black" />
        <DataTable columns={columns} data={userData} />
      </div>
    </div>
  );
};

export default UserDataPage;
