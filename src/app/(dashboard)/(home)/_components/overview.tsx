"use client";

import { getMovimentationByMonth } from "@/_actions/movimentation";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function Overview() {
  const [resData, setData] =
    useState<{ name: string; total: string | number }[]>();

  useEffect(() => {
    async function getData() {
      await getMovimentationByMonth().then((res) => setData(res));
    }
    getData();
  }, []);


  return (
    <ChartContainer config={chartConfig} className="max-h-[350px] w-full">
      <BarChart accessibilityLayer data={resData}>
        <XAxis
          dataKey="name"
          fontSize={12}
          tickLine={false}
          tickMargin={10}
          axisLine={true}
        />
        <YAxis fontSize={12} tickLine={false} axisLine={true} />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value) =>
                value.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })
              }
            />
          }
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ChartContainer>
  );
}
