import CompanyCharts from "@/components/dashboard/admin/companyCharts";
import { CompanyStats } from "@/components/job/companyStats";

const AdminPage = async () => {
  return (
    <div className="container w-full mx-auto py-10 space-y-6">
      <CompanyStats />
      <CompanyCharts />
    </div>
  );
};

export default AdminPage;
