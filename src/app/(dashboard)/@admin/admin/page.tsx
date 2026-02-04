import { Users, Store, DollarSign, Package, AlertCircle, Pill } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { ChartConfig } from "@/components/ui/chart";
import StatsCard from "@/components/modules/admin/a-stats-card";
import { getAdminMetadata } from "@/actions/admin.action";
import AdminDashboardChart from "@/components/modules/admin/admin-dashboard-chart";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

const chartData = [
  { month: "January", revenue: 0 },
  { month: "February", revenue: 0 },
  { month: "March", revenue: 0 },
  { month: "April", revenue: 0 },
  { month: "May", revenue: 0 },
  { month: "June", revenue: 0 },
  { month: "July", revenue: 0 },
];


export default async function AdminDashboardPage() {
  const { data } = await getAdminMetadata();
  const meta = data?.data?.meta;
  console.log(data?.data?.meta);
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Platform Overview</h1>
        <p className="text-muted-foreground italic">
          Welcome back, Admin. Here is what's happening today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Revenue"
          value={meta?.totalRevenue}
          description="+14% from last month"
          icon={<DollarSign className="size-5 text-green-600" />}
        />
        <StatsCard
          title="Active Sellers"
          value={meta?.totalSeller}
          // description="1 pending approvals"
          icon={<Store className="size-5 text-blue-600" />}
          trend="warning"
        />
        <StatsCard
          title="Total Customers"
          value={meta?.totalCustomer}
          description="+180 this week"
          icon={<Users className="size-5 text-purple-600" />}
        />
        <StatsCard
          title="Total Medicine"
          value={meta?.totalMedicines}
          description="all medicines"
          icon={<Pill className="size-5 text-orange-600" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <AdminDashboardChart chartConfig={chartConfig} chartData={chartData} />

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
                <span className="font-bold">0% complete</span>
              </div>
              <Progress value={0} className="h-2" />
            </div>

            <div className="space-y-4 pt-4">
              {/* <div className="flex items-center gap-4 bg-red-50/50 dark:bg-red-950/20 p-3 rounded-lg border border-red-100 dark:border-red-900/30">
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
              </div> */}
{/* 
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
              </div> */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
