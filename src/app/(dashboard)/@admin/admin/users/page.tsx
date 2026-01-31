"use client";

import React, { useState } from "react";
import {
  Search,
  MoreHorizontal,
  Mail,
  Ban,
  UserCheck,
  History,
  Download,
  Filter,
  UserPlus,
  User2,
  UserRoundCheckIcon,
  UserPlus2,
  X,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MetricCard from "@/components/modules/admin/metric-card";
import SearchFilterBar from "@/components/modules/shared/search-filter-bar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PaginationControl from "@/components/shared/pagination";
import { TooltipButton } from "@/components/ui/tooltip-button";

const customersData = [
  {
    id: "CUST-901",
    name: "Arif Chen",
    email: "arif.chen@email.com",
    orders: 12,
    totalSpent: 450.5,
    status: "Active",
    lastOrder: "2026-01-25",
    image: "https://github.com/shadcn.png",
  },
  {
    id: "CUST-902",
    name: "Jannat Rakhi",
    email: "j.rakhi@service.net",
    orders: 2,
    totalSpent: 85.0,
    status: "Suspended",
    lastOrder: "2025-12-10",
    image: "",
  },
  {
    id: "CUST-903",
    name: "Sabbir Ahmed",
    email: "sabbir.vibe@web.com",
    orders: 28,
    totalSpent: 1240.25,
    status: "Active",
    lastOrder: "2026-01-30",
    image: "",
  },
];

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  return (
    <div className="p-5 space-y-6 w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Customer Management
          </h1>
          <p className="text-muted-foreground italic">
            Monitor user activity, orders, and account health.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary">
            <Download className="mr-2 size-4" /> Export CSV
          </Button>
          <Button className="gap-2">
            <UserPlus className="size-4" /> Add Customer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Total Customers"
          value="1,240"
          sub="Active users"
          icon={User2}
        />
        <MetricCard
          title="New This Month"
          value="+180"
          sub="15% growth"
          icon={UserPlus2}
        />
        <MetricCard
          title="Avg. Lifetime Value"
          value="$342.00"
          sub="Per customer"
          icon={UserRoundCheckIcon}
        />
      </div>

      <Card className="border-0! bg-transparent! w-full">
        <CardHeader className="p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
          <SearchFilterBar filter={false} />
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 h-9 rounded-full">
                <div className="flex items-center gap-2">
                  <Filter className="size-4" />
                  <SelectValue placeholder="Status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active Only</SelectItem>
                <SelectItem value="Suspended">Suspended</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            {statusFilter !== "all" && (
              <Button
                variant="secondary"
                size="icon"
                onClick={() => setStatusFilter("all")}
              >
                <X />
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customersData.map((customer) => (
                <TableRow
                  key={customer.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9 border border-muted">
                        <AvatarImage src={customer.image} />
                        <AvatarFallback>
                          {customer.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm">
                          {customer.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {customer.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        customer.status === "Active"
                          ? "secondary"
                          : "destructive"
                      }
                      className="text-sm tracking-wider font-semibold px-5 py-1"
                    >
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-medium">
                    {customer.orders} orders
                  </TableCell>
                  <TableCell className="text-sm font-semibold">
                    ${customer.totalSpent.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {customer.lastOrder}
                  </TableCell>
                  <TableCell className="text-right space-x-3">
                    <TooltipButton
                      title="Suspend Account"
                      icon={Ban}
                      size={"icon"}
                    />
                    <TooltipButton
                      title="Order History"
                      icon={History}
                      size={"icon"}
                    />

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Customer Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Mail className="mr-2 size-4" /> Send Email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-amber-600">
                          <UserCheck className="mr-2 size-4" /> Reset Password
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-10">
            <PaginationControl
              currentPage={1}
              totalPages={5}
              options={{ size: "icon" }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
