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
  Search,
  Download,
  Calendar as CalendarIcon,
  Filter,
  ArrowRightLeft,
  CheckCircle2,
  XCircle,
  Undo2,
  PackageCheck,
  Pill,
} from "lucide-react";
import { OrderDetailsModal } from "@/components/modules/seller/orderview-dialog";
import SearchFilterBar from "@/components/modules/shared/search-filter-bar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import HistoryFilter from "@/components/modules/seller/h-filters";
import PaginationControl from "@/components/shared/pagination";

const orderHistory = [
  {
    id: "ORD-7710",
    customer: "Karim Ullah",
    date: "Jan 28, 2026",
    total: "2,450.00",
    status: "Delivered",
    payment: "Paid",
    method: "bKash",
  },
  {
    id: "ORD-7705",
    customer: "Fatima Begum",
    date: "Jan 25, 2026",
    total: "890.00",
    status: "Cancelled",
    payment: "Refunded",
    method: "Card",
  },
  {
    id: "ORD-7699",
    customer: "Sabbir Ahmed",
    date: "Jan 20, 2026",
    total: "1,120.00",
    status: "Delivered",
    payment: "Paid",
    method: "COD",
  },
];

export default function OrderHistoryPage() {
  const [filterStatus, setFilterStatus] = React.useState("All");
  const [sortOrder, setSortOrder] = React.useState("newest"); // "newest" | "oldest" | "highest"
  return (
    <div className="p-5 w-full mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Order History</h1>
          <p className="text-muted-foreground">
            View and export all past transactions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <CalendarIcon className="mr-2 size-4" /> Date Range
          </Button>
          <Button variant="default">
            <Download className="mr-2 size-4" /> Export CSV
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="">
            <CardTitle className="text-2xl font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="text-3xl font-bold">$42,500.00</div>
              <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                +12% from last month
              </p>
            </div>
            <Pill size={70} strokeWidth={1} className="text-muted-foreground" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-medium text-muted-foreground">
              Completed Orders
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="text-3xl font-bold">1,284</div>
              <p className="text-sm text-muted-foreground mt-1">
                98% fulfillment rate
              </p>
            </div>
            <PackageCheck
              size={70}
              strokeWidth={1}
              className="text-muted-foreground"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-medium text-muted-foreground">
              Refunds/Canceled
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between px-10">
            <div className="flex flex-col">
              <div className="text-3xl font-semibold">24</div>
              <p className="text-sm text-muted-foreground mt-1">
                Issues resolved
              </p>
            </div>
            <Undo2
              size={70}
              strokeWidth={1}
              className="text-muted-foreground"
            />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-transparent! border-0!">
        <CardHeader className="p-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <SearchFilterBar filter={false} />
            <HistoryFilter />
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Order Info</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Final Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderHistory.map((order) => (
                <TableRow
                  key={order.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-mono font-bold text-sm text-primary">
                        {order.id}
                      </span>
                      <span className="text-[10px] text-muted-foreground italic">
                        {order.date}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {order.customer}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-muted px-2 py-0.5 rounded border">
                        {order.method}
                      </span>
                      <span
                        className={`text-[10px] ${order.payment === "Paid" ? "text-green-600" : "text-red-600"}`}
                      >
                        • {order.payment}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {order.status === "Delivered" ? (
                      <div className="flex items-center text-green-700 text-xs font-semibold gap-1">
                        <CheckCircle2 className="size-3" /> {order.status}
                      </div>
                    ) : (
                      <div className="flex items-center text-red-700 text-xs font-semibold gap-1">
                        <XCircle className="size-3" /> {order.status}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-bold">${order.total}</TableCell>
                  <TableCell className="text-right">
                    <OrderDetailsModal order={order} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-10">
            <PaginationControl
              currentPage={1}
              totalPages={6}
              options={{ size: "icon" }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
