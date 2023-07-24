import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

export async function JobCharts({ data }: { data: any }) {
  return (
    <>
      <LineChart width={600} height={300} data={data}>
        <Line type="monotone" dataKey="" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
    </>
  );
}
