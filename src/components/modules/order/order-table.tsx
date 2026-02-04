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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye } from "lucide-react";

import SearchFilterBar from "@/components/modules/shared/search-filter-bar";
import PaginationControl from "@/components/shared/pagination";
import { TooltipButton } from "@/components/ui/tooltip-button";
import { OrderDetailsModal } from "@/components/modules/seller/orderview-dialog";
import { useQueryFilters } from "@/hooks/use-search-filter";
import EmptyCard from "@/components/shared/empty-card";

export default function OrderTable({
  data,
  pagination,
}: {
  data: [];
  pagination: any;
}) {
  const { status, setSingleFilter } = useQueryFilters();

  return (
    <>
      <Card className="bg-transparent! border-0!">
        <CardHeader className="p-4 flex flex-col md:flex-row gap-4 items-center">
          <SearchFilterBar filter={false} />
          <Select
            defaultValue="all"
            value={status}
            onValueChange={(val) => setSingleFilter("status", val)}
          >
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

        {data?.length === 0 ? (
          <EmptyCard />
        ) : (
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
                {data?.map((order: any) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono font-bold text-primary">
                      {order.id}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{order.customer?.name}</span>
                        <span className="text-[10px] text-muted-foreground uppercase">
                          {order.items?.length} Items
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{order?.createdAt}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-normal">
                        {order.payment || "null"}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold">
                      ${order.totalPrice}
                    </TableCell>
                    <TableCell>
                      <Badge>{order.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <OrderDetailsModal order={order} />
                      
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-11">
              <PaginationControl
                currentPage={pagination?.page}
                totalPages={pagination?.pages}
                options={{ size: "icon" }}
              />
            </div>
          </CardContent>
        )}
      </Card>
    </>
  );
}
