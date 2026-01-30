"use client";

import React from "react";
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Package,
  AlertCircle,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import StatsCard from "@/components/modules/seller/status-card";

const revenueData = [
  { date: "2026-01-24", desktop: 1200 },
  { date: "2026-01-25", desktop: 1900 },
  { date: "2026-01-26", desktop: 1500 },
  { date: "2026-01-27", desktop: 2800 },
  { date: "2026-01-28", desktop: 2200 },
  { date: "2026-01-29", desktop: 3400 },
  { date: "2026-01-30", desktop: 2900 },
];

const inventoryData = [
  { category: "Tablets", stock: 450, fill: "var(--color-tablets)" },
  { category: "Syrup", stock: 300, fill: "var(--color-syrup)" },
  { category: "Inhaler", stock: 150, fill: "var(--color-inhaler)" },
  { category: "Ointment", stock: 200, fill: "var(--color-ointment)" },
];

const chartConfig = {
  desktop: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
  tablets: { label: "Tablets", color: "hsl(var(--chart-1))" },
  syrup: { label: "Syrup", color: "hsl(var(--chart-2))" },
  inhaler: { label: "Inhaler", color: "hsl(var(--chart-3))" },
  ointment: { label: "Ointment", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig;

export default function SellerDashboardPage() {
  return (
    <div className="p-4 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Performance insights for your pharmacy.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value="$12,450"
          icon={DollarSign}
          trend="+12%"
        />
        <StatsCard title="Orders" value="145" icon={ShoppingCart} trend="+8%" />
        <StatsCard title="Items" value="432" icon={Package} trend="Stable" />
        <StatsCard
          title="Low Stock"
          value="12"
          icon={AlertCircle}
          trend="Action Required"
          color="text-destructive"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Revenue Analytics - Takes up more space, uses wide aspect ratio */}
        <Card className="lg:col-span-4 flex flex-col">
          <CardHeader>
            <CardTitle>Revenue Analytics</CardTitle>
            <CardDescription>
              Daily sales performance for the last 7 days.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            {/* Aspect-auto on mobile, aspect-video on large screens */}
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[300px] md:aspect-video md:max-h-[400px] w-full"
            >
              <AreaChart
                data={revenueData}
                margin={{ left: 5, right: 6, top: 10 }}
              >
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  className="stroke-muted"
                />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(8, 10) + " Jan"}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => `$${value}`}
                />
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Area
                  dataKey="desktop"
                  type="natural"
                  fill="var(--color-desktop)"
                  fillOpacity={0.4}
                  stroke="var(--color-desktop)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Inventory by Category - Compact, uses square aspect ratio */}
        <Card className="lg:col-span-3 flex flex-col">
          <CardHeader>
            <CardTitle>Inventory by Category</CardTitle>
            <CardDescription>Current stock distribution.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square w-full max-h-[300px] md:max-h-[400px]"
            >
              <BarChart
                data={inventoryData}
                layout="vertical"
                margin={{ left: 0, right: 20 }}
              >
                <XAxis type="number" hide />
                <YAxis
                  dataKey="category"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  className="capitalize"
                  width={60} // Give enough room for text labels
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="stock"
                  layout="vertical"
                  radius={10}
                  barSize={40}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Helper Component
