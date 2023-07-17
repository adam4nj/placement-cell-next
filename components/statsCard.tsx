"use client";

import { Suspense } from "react";
import { CountUp } from "use-count-up";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type StatsCardProps = {
  title: string;
  count: number;
  percentage: number;
};

export function StatsCard({ title, count, percentage }: StatsCardProps) {
  return (
    <Suspense fallback="Loading..">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <CountUp isCounting end={count} duration={3.2} />
          </div>
          <p className="text-xs text-muted-foreground">
            <CountUp isCounting end={percentage} duration={3.2} />%
          </p>
        </CardContent>
      </Card>
    </Suspense>
  );
}
