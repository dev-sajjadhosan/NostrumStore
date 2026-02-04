import { Button } from "@/components/ui/button";

import {
  ShoppingBag,
  CheckCircle2,
  Clock,
  Truck,
  FileText,
} from "lucide-react";

import StatusCard from "@/components/modules/seller/o-status-card";
import OrderTable from "@/components/modules/order/order-table";
import { PgOptionsRs } from "@/types/types";
import { SellerServices } from "@/services/seller.service";

export default async function OrderManagerPage({
  searchParams,
}: {
  searchParams: Promise<PgOptionsRs>;
}) {
  const { page, search } = await searchParams;
  const { data } = await SellerServices.getSellerAllOrders({ page, search });

  const orders = data?.data?.data;
  const meta = data?.data?.meta
  const pagination = data?.data?.pagination;

  return (
    <div className="p-5 w-full mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Order Management
          </h1>
          <p className="text-muted-foreground italic">
            Track and process your pharmacy sales.
          </p>
        </div>
        <Button className="w-full md:w-auto">
          <FileText className="mr-2 size-4" /> Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard
          title="Total Orders"
          count={orders?.length}
          icon={ShoppingBag}
          color="text-blue-600"
        />
        <StatusCard
          title="Pending"
          count={meta?.pending}
          icon={Clock}
          color="text-orange-600"
        />
        <StatusCard
          title="Shipped"
          count={meta?.shipped}
          icon={Truck}
          color="text-purple-600"
        />
        <StatusCard
          title="Delivered"
          count={meta?.delivered}
          icon={CheckCircle2}
          color="text-green-600"
        />
      </div>

      <OrderTable data={orders} pagination={pagination} />
    </div>
  );
}
