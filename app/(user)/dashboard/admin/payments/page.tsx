import { Payment, columns } from "./components/columns"
import { DataTable } from "@/components/dataTable"
import  Search  from "@/components/searchBox"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      balance:0,
      status: "Pending",
      email: "m@example.com",
    },
    {
      id: "728ed51f",
      amount: 100,
      balance:0,
      status: "Pending",
      email: "m@example.com",
    },
    
  ]
}

export default async function PaymentsPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const data = await getData()
  const search = searchParams.q ?? '';

  //nextjs-planetscale-nextauth-tailwindcss-template/app/page.tsx -- See this

  return (
    <main className="container">
      <div className="mx-auto">
      <Search />
      </div>
    <div className="mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
    </main>
  )
}
