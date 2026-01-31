"use client";

import React, { useState } from "react";
import {
  Search,
  MoreHorizontal,
  Eye,
  Truck,
  Package,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowUpRight,
  Filter,
  FileDown,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TooltipButton } from "@/components/ui/tooltip-button";
import SearchFilterBar from "@/components/modules/shared/search-filter-bar";
import OrderDetailsSheet from "@/components/modules/admin/order-details-sheet";
import PaginationControl from "@/components/shared/pagination";

const ordersData = [
  {
    id: "ORD-7721",
    customer: "Arif Chen",
    vendor: "Lazz Pharma",
    items: 3,
    total: 154.0,
    status: "Delivered",
    payment: "Paid",
    date: "2026-01-30",
  },
  {
    id: "ORD-7722",
    customer: "Jannat Rakhi",
    vendor: "Tamanna Pharmacy",
    items: 1,
    total: 45.5,
    status: "Processing",
    payment: "Pending",
    date: "2026-01-31",
  },
  {
    id: "ORD-7723",
    customer: "Sabbir Ahmed",
    vendor: "Model Medicine",
    items: 5,
    total: 890.0,
    status: "Shipped",
    payment: "Paid",
    date: "2026-01-31",
  },
];

export default function AllOrdersPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
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
          <Button variant="outline" className="gap-2">
            <FileDown className="size-4" /> Export Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatusSummaryCard
            title="Pending"
            count="12"
            icon={Clock}
            color="bg-amber-50"
          />
          <StatusSummaryCard
            title="Processing"
            count="08"
            icon={Package}
            color="bg-blue-50"
          />
          <StatusSummaryCard
            title="Shipped"
            count="24"
            icon={Truck}
            color="bg-purple-50"
          />
          <StatusSummaryCard
            title="Completed"
            count="142"
            icon={CheckCircle2}
            color="bg-green-50"
          />
        </div>

        <Card className="border-0! bg-transparent! mt-14">
          <CardHeader className="p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
            <SearchFilterBar filter={false} />
            <div className="flex items-center gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40 rounded-full">
                  <Filter className="mr-2 size-4 text-muted-foreground" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Shipped">Shipped</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[120px]">Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  {/* <TableHead>Vendor</TableHead> */}
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ordersData.map((order) => (
                  <TableRow
                    key={order.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <TableCell className="font-mono text-xs font-bold">
                      {order.id}
                    </TableCell>
                    <TableCell className="text-sm font-medium">
                      {order.customer}
                    </TableCell>
                    {/* <TableCell>
                  <Badge
                    variant="outline"
                    className="bg-primary/5 text-primary border-primary/20"
                  >
                    {order.vendor}
                  </Badge>
                </TableCell> */}
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold">
                          ${order.total.toFixed(2)}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {order.items} items
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <div
                          className={`size-2 rounded-full ${getStatusColor(order.status)}`}
                        />
                        <span className="text-xs font-medium">
                          {order.status}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.payment === "Paid" ? "secondary" : "destructive"
                        }
                        className="text-sm tracking-wider font-semibold px-5 py-1"
                      >
                        {order.payment}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-5 space-x-3">
                      <TooltipButton
                        icon={Eye}
                        title="View Details"
                        size={"icon"}
                        onClick={() => {
                          setSelectedOrder(order);
                          setIsDetailsOpen(true);
                        }}
                      />
                      {/* <TooltipButton icon={Truck} title="Track Logistics" size={'icon'} /> */}
                      <TooltipButton
                        icon={XCircle}
                        title="Cancel Order"
                        size={"icon"}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="mt-9">
            <PaginationControl
              currentPage={1}
              totalPages={6}
              options={{ size: "icon" }}
            />
          </CardFooter>
        </Card>
      </div>
      <OrderDetailsSheet
        order={selectedOrder}
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
      />
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

function getStatusColor(status: string) {
  switch (status) {
    case "Delivered":
      return "bg-green-500";
    case "Shipped":
      return "bg-purple-500";
    case "Processing":
      return "bg-blue-500";
    case "Pending":
      return "bg-amber-500";
    default:
      return "bg-gray-500";
  }
}
