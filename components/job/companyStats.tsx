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
import { Progress } from "@/components/ui/progress";
import { Separator } from "../ui/separator";

type AdminChartProps = {
  data: {
    type: string;
    Posts: number;
    Applications: number;
    Accepted: number;
  }[];
  student?: number;
  company?: number;
};

export function CompanyStats({ data, student, company }: AdminChartProps) {
  const job = data[0].Posts;
  const jobapp = data[0].Applications;
  const jaccept = data[0].Accepted;

  const intern = data[1].Posts;
  const internapp = data[1].Applications;
  const iaccept = data[1].Accepted;

  const userdata = [
    {
      name: "Student",
      users: student,
    },
    {
      name: "Company",
      users: company,
    },
  ];
  return (
    <>
      <Separator className="my-8 bg-black" />
      {(company || student) && (
        <>
          <h2 className="my-5 ml-5 text-2xl font-bold">User Statistics</h2>

          <div className="grid grid-cols-2 gap-5">
            <Card className="border-2 border-black pt-4">
              <BarChart
                width={400}
                height={300}
                data={userdata}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#0014FF" />
              </BarChart>
            </Card>

            <div className="mt-8 grid grid-cols-1 gap-2">
              <div className="flex flex-row justify-between">
                <span className="font-bold">No of Students</span>
                <span className="text-2xl font-bold">{student}</span>
              </div>
              <Progress
                value={student}
                className="-my-8 h-8 rounded-lg border-2 border-black"
              />
              <div className="flex flex-row justify-between">
                <span className="font-bold">No of Companies</span>
                <span className="text-2xl font-bold">{company}</span>
              </div>
              <Progress
                value={company}
                className="-my-8 h-8 rounded-lg border-2 border-black"
              />
            </div>
          </div>
          <Separator className="my-8 bg-black" />
        </>
      )}
      <h2 className="my-5 ml-5 text-2xl font-bold">Job Statistics</h2>
      <Card className="mt-4 flex flex-row items-center justify-center border-2 border-black p-2 pt-5 text-sm">
        <BarChart
          width={900}
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
          <Bar dataKey="Posts" fill="#0014FF" />
          <Bar dataKey="Applications" fill="#009EFF" />
          <Bar dataKey="Accepted" fill="#00E7FF" />
        </BarChart>
      </Card>
      <div className="grid grid-cols-2 gap-5">
        <div className="mt-8 grid grid-cols-1 space-y-4">
          <div className="flex flex-row justify-between">
            <span className="font-bold">Posted Jobs</span>
            <span className="text-2xl font-bold">{job}</span>
          </div>
          <Progress
            value={job}
            className="-my-8 h-8 rounded-lg border-2 border-black"
          />
          <div className="flex flex-row justify-between">
            <span className="font-bold">Job Applications</span>
            <span className="text-2xl font-bold">{jobapp}</span>
          </div>
          <Progress
            value={jobapp}
            className="-my-8 h-8 rounded-lg border-2 border-black"
          />
        </div>
        <div className="mt-8 grid grid-cols-1 space-y-4">
          <div className="flex flex-row justify-between">
            <span className="font-bold">Posted Internships</span>
            <span className="text-2xl font-bold">{intern}</span>
          </div>
          <Progress
            value={job}
            className="-my-8 h-8 rounded-lg border-2 border-black"
          />
          <div className="flex flex-row justify-between">
            <span className="font-bold">Internship Applications</span>
            <span className="text-2xl font-bold">{internapp}</span>
          </div>
          <Progress
            value={jobapp}
            className="-my-8 h-8 rounded-lg border-2 border-black"
          />
        </div>
      </div>
    </>
  );
}
