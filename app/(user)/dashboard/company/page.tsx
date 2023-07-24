import { CompanyStats } from "@/components/job/companyStats";

export default function DashBoardPage() {
  return (
    <div className="my-8 space-y-6">
      <CompanyStats />
    </div>
  );
  //Line Chart- pnpm add recharts
}
