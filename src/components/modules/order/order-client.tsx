"use client";

import { useState } from "react";
import { Eye, XCircle, Filter } from "lucide-react";
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

import PaginationControl from "@/components/shared/pagination";
import OrderDetailsSheet from "../admin/order-details-sheet";
import EmptyCard from "@/components/shared/empty-card";
import OrderSearchFilter from "./order-search-filter";

export default function OrderClient({ data }: { data: any }) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const orders: any[] = data?.data?.data;
  const pagination = data?.data?.pagination;

  return (
    <>
      <OrderDetailsSheet
        order={selectedOrder}
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
      />
      <div>
        <Card className="border-0! bg-transparent! mt-14">
          <CardHeader className="p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
            <OrderSearchFilter/>
          </CardHeader>

          {orders?.length === 0 ? (
            <EmptyCard />
          ) : (
            <>
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
                    {orders.map((order) => (
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
                              order.payment === "Paid"
                                ? "secondary"
                                : "destructive"
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
              <CardFooter className="mt-9 justify-center">
                <PaginationControl
                  currentPage={1}
                  totalPages={6}
                  options={{ size: "icon" }}
                />
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </>
  );
}

export function getStatusColor(status: string) {
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
