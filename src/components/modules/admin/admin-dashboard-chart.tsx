"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function AdminDashboardChart({
  chartConfig,
  chartData,
}: {
  chartConfig: any;
  chartData: any;
}) {
  return (
    <>
      <Card className="col-span-1 lg:col-span-4 shadow-sm border-muted/40">
        <CardHeader>
          <CardTitle>Platform Growth</CardTitle>
          <CardDescription>
            Visualizing revenue trends for H1 2026
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[300px] w-full"
          >
            <AreaChart
              data={chartData}
              margin={{ left: 12, right: 12, top: 12 }}
            >
              <defs>
                <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-revenue)"
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-revenue)"
                    stopOpacity={0.01}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                className="stroke-muted"
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
                className="text-muted-foreground"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                className="text-muted-foreground"
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                dataKey="revenue"
                type="natural"
                fill="url(#fillRevenue)"
                stroke="var(--color-revenue)"
                strokeWidth={2}
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
}
