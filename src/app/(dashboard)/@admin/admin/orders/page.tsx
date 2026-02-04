import { Truck, Package, CheckCircle2, Clock, FileDown } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { AdminService } from "@/services/admin.service";
import OrderClient from "@/components/modules/order/order-client";
import { getAdminMetadata } from "@/actions/admin.action";
import { PgOptionsRs } from "@/types/types";

export default async function AllOrdersPage({
  searchParams,
}: {
  searchParams: Promise<PgOptionsRs>;
}) {
  const { page, search, sortBy, sortOrder, status } = await searchParams;
  const { data } = await AdminService.getAllOrders({
    page,
    search,
    sortBy,
    status,
    sortOrder,
  });
  const { data: odata } = await getAdminMetadata();

  const order = odata?.data?.orders;

  return (
    <>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Global Orders</h1>
            <p className="text-muted-foreground italic">
              Monitor every transaction across the platform.
            </p>
          </div>
          <Button variant="outline" className="gap-2" disabled>
            <FileDown className="size-4" /> Export Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatusSummaryCard
            title="Pending"
            count={order.pendingOrder}
            icon={Clock}
            color="bg-amber-50"
          />
          <StatusSummaryCard
            title="Cancelled"
            count={order.cancelledOrder}
            icon={Package}
            color="bg-blue-50"
          />
          <StatusSummaryCard
            title="Shipped"
            count={order.shippedOrder}
            icon={Truck}
            color="bg-purple-50"
          />
          <StatusSummaryCard
            title="Completed"
            count={order.deliversOrder}
            icon={CheckCircle2}
            color="bg-green-50"
          />
        </div>

        <OrderClient data={data} />
      </div>
    </>
  );
}

function StatusSummaryCard({ title, count, icon: Icon, color }: any) {
  return (
    <Card className="border-muted/40 shadow-sm">
      <CardHeader>
        <p className="text-xl text-muted-foreground font-semibold capitalize">
          {title}
        </p>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <p className="text-5xl font-semibold">{count}</p>

        <Icon size={50} strokeWidth={1} />
      </CardContent>
    </Card>
  );
}
