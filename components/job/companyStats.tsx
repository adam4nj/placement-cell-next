"use client";

import {
  BarChart,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  XAxis,
  RadialBarChart,
  RadialBar,
} from "recharts";
import { Card, CardHeader } from "../ui/card";

type AdminChartProps = {
  data: {
    type: string;
    Posts: number;
    Applications: number;
  }[];
};

export function CompanyStats({ data }: AdminChartProps) {
  const jobbardata = [
    {
      name: "Total Jobs",
      value: data[0].Posts,
    },
    {
      name: "Total Job Applications",
      value: data[0].Applications,
    },
  ];

  const internbardata = [
    {
      name: "Total Internships",
      value: data[1].Posts,
    },
    {
      name: "Total Internship Applications",
      value: data[1].Applications,
    },
  ];
  console.log(data);
  return (
    <>
      <Card className="mt-4 flex w-full flex-col p-2 text-sm">
        <CardHeader className="text-xl font-bold">Job Statistics</CardHeader>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Posts" fill="#8884d8" />
          <Bar dataKey="Applications" fill="#82ca9d" />
        </BarChart>
      </Card>
      <div className="mt-8 grid grid-cols-2 gap-2">
        <RadialBarChart
          width={730}
          height={500}
          innerRadius="30%"
          outerRadius="80%"
          data={jobbardata}
          startAngle={180}
          endAngle={0}
        >
          <RadialBar
            label={{ fill: "#666", position: "insideStart" }}
            background
            dataKey="value"
          />
          <Legend
            iconSize={10}
            width={200}
            height={140}
            layout="vertical"
            verticalAlign="top"
            align="right"
          />
          <Tooltip />
        </RadialBarChart>
        <RadialBarChart
          width={730}
          height={500}
          innerRadius="30%"
          outerRadius="80%"
          data={internbardata}
          startAngle={180}
          endAngle={0}
        >
          <RadialBar
            label={{ fill: "#666", position: "insideStart" }}
            background
            dataKey="value"
          />
          <Legend
            iconSize={10}
            width={200}
            height={140}
            layout="vertical"
            verticalAlign="top"
            align="right"
          />
          <Tooltip />
        </RadialBarChart>
      </div>
    </>
  );
}
