"use client";

import React from "react";
import {
  Users,
  Store,
  DollarSign,
  Package,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import StatsCard from "@/components/modules/admin/a-stats-card";

// 1. Chart Configuration for Shadcn
const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

// 2. Mock Data
const chartData = [
  { month: "January", revenue: 18600 },
  { month: "February", revenue: 30500 },
  { month: "March", revenue: 23700 },
  { month: "April", revenue: 73000 },
  { month: "May", revenue: 20900 },
  { month: "June", revenue: 21400 },
  { month: "July", revenue: 45000 },
];

export default function AdminDashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Platform Overview</h1>
        <p className="text-muted-foreground italic">
          Welcome back, Admin. Here is what's happening today.
        </p>
      </div>

      {/* Primary Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Revenue"
          value="$128,430.00"
          description="+14% from last month"
          icon={<DollarSign className="size-5 text-green-600" />}
        />
        <StatsCard
          title="Active Sellers"
          value="42"
          description="3 pending approvals"
          icon={<Store className="size-5 text-blue-600" />}
          trend="warning"
        />
        <StatsCard
          title="Total Customers"
          value="1,240"
          description="+180 this week"
          icon={<Users className="size-5 text-purple-600" />}
        />
        <StatsCard
          title="Global SKUs"
          value="8,543"
          description="Medicines listed platform-wide"
          icon={<Package className="size-5 text-orange-600" />}
        />
      </div>

      {/* Main Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        {/* SHADCN CHART CARD */}
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

        {/* Action Center / Critical Alerts (RHS) */}
        <Card className="col-span-1 lg:col-span-3 shadow-sm border-muted/40">
          <CardHeader>
            <CardTitle>Action Center</CardTitle>
            <CardDescription>Items requiring admin attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="flex items-center gap-2">
                  <AlertCircle className="size-4 text-orange-500" /> Seller
                  Verifications
                </span>
                <span className="font-bold">85% complete</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4 bg-red-50/50 dark:bg-red-950/20 p-3 rounded-lg border border-red-100 dark:border-red-900/30">
                <div className="bg-red-500 p-2 rounded text-white font-bold text-xs">
                  03
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-red-900 dark:text-red-400">
                    New Seller Applications
                  </p>
                  <p className="text-red-700/70 dark:text-red-500/70 text-xs">
                    Awaiting document review
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-blue-50/50 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-100 dark:border-blue-900/30">
                <div className="bg-blue-500 p-2 rounded text-white font-bold text-xs">
                  12
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-blue-900 dark:text-blue-400">
                    Flagged Reviews
                  </p>
                  <p className="text-blue-700/70 dark:text-blue-500/70 text-xs">
                    Customer complaints to investigate
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
