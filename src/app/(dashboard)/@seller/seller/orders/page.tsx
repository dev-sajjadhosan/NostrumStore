"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ShoppingBag,
  Search,
  Eye,
  CheckCircle2,
  Clock,
  Truck,
  FileText,
} from "lucide-react";
import StatusCard from "@/components/modules/seller/o-status-card";
import SearchFilterBar from "@/components/modules/shared/search-filter-bar";
import PaginationControl from "@/components/shared/pagination";
import { TooltipButton } from "@/components/ui/tooltip-button";
import { OrderDetailsModal } from "@/components/modules/seller/orderview-dialog";

const orders = [
  {
    id: "ORD-7721",
    customer: "Arif Rahman",
    date: "Oct 24, 2023",
    total: "1,250.00",
    status: "Pending",
    payment: "Paid",
    items: 3,
  },
  {
    id: "ORD-7722",
    customer: "Sarah Khan",
    date: "Oct 24, 2023",
    total: "450.00",
    status: "Shipped",
    payment: "COD",
    items: 1,
  },
  {
    id: "ORD-7723",
    customer: "John Doe",
    date: "Oct 23, 2023",
    total: "3,100.00",
    status: "Delivered",
    payment: "Paid",
    items: 5,
  },
];

export default function OrderManagerPage() {
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
          count="156"
          icon={ShoppingBag}
          color="text-blue-600"
        />
        <StatusCard
          title="Pending"
          count="12"
          icon={Clock}
          color="text-orange-600"
        />
        <StatusCard
          title="Shipped"
          count="45"
          icon={Truck}
          color="text-purple-600"
        />
        <StatusCard
          title="Delivered"
          count="99"
          icon={CheckCircle2}
          color="text-green-600"
        />
      </div>

      <Card className="bg-transparent! border-0!">
        <CardHeader className="p-4 flex flex-col md:flex-row gap-4 items-center">
          <SearchFilterBar filter={false} />
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-45 rounded-full">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-25">Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono font-bold text-primary">
                    {order.id}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{order.customer}</span>
                      <span className="text-[10px] text-muted-foreground uppercase">
                        {order.items} Items
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{order.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal">
                      {order.payment}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold">
                    ${order.total}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={order.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <OrderDetailsModal order={order}/>
                    <TooltipButton
                      icon={Eye}
                      title="View Order"
                      variant={"secondary"}
                      size={"icon"}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-11">
            <PaginationControl currentPage={1} totalPages={10} options={{size: "icon"}} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    Pending: "bg-orange-100 text-orange-700 border-orange-200",
    Shipped: "bg-purple-100 text-purple-700 border-purple-200",
    Delivered: "bg-green-100 text-green-700 border-green-200",
  };

  return (
    <Badge className={`${styles[status]} font-semibold px-5 py-2`}>
      {status}
    </Badge>
  );
}
