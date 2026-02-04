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
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PageBanner from "@/components/shared/page-banner";
import {
  ArrowUpRightFromCircle,
  Loader,
  LucideIcon,
  PackageCheck,
  PackageIcon,
  PackageSearch,
  PackageX,
  Van,
} from "lucide-react";
import PaginationControl from "@/components/shared/pagination";
import { Separator } from "@/components/ui/separator";
import { TooltipButton } from "@/components/ui/tooltip-button";
import Link from "next/link";
import { userService } from "@/services/user.service";
import OrderDeleteAlert from "@/components/shared/order-delete-order";

interface OrdersItem {
  name: string;
  amount: number;
  icon:
    | LucideIcon
    | React.ComponentType<{ className?: string; strokeWidth?: number }>
    | string;
}

// const orders = [
//   {
//     id: "ORD001",
//     date: "2024-03-20",
//     status: "Delivered",
//     amount: 250.0,
//     items: 3,
//   },
//   {
//     id: "ORD002",
//     date: "2024-03-21",
//     status: "Processing",
//     amount: 45.5,
//     items: 1,
//   },
//   {
//     id: "ORD003",
//     date: "2024-03-22",
//     status: "Shipped",
//     amount: 120.0,
//     items: 2,
//   },
//   {
//     id: "ORD004",
//     date: "2024-03-22",
//     status: "Cancelled",
//     amount: 0.0,
//     items: 0,
//   },
// ];

export default async function OrdersPage() {
  const { data } = await userService.getAllOrders();
  const orders = data?.data?.data;
  const meta = data?.data?.meta;
  const pagination = data?.data?.pagination;

  // pending: 0, cancelled: 0, delivered: 1, processing: 0, shipped: 0, total: 1

  const statusCards: OrdersItem[] = [
    {
      name: "Delivered",
      amount: meta?.delivered,
      icon: PackageCheck,
    },
    {
      name: "Processing",
      amount: meta?.processing,
      icon: PackageSearch,
    },
    {
      name: "Orders",
      amount: meta?.total,
      icon: PackageIcon,
    },
    {
      name: "Cancelled",
      amount: meta?.cancelled,
      icon: PackageX,
    },
  ];

  return (
    <div className="w-11/12 mx-auto flex flex-col gap-28">
      <PageBanner name="Orders" icon={Van} />
      <section className="grid grid-cols-4 gap-3 w-full">
        {statusCards.map((item, idx) => (
          <Card
            key={idx}
            className="w-full h-50 duration-100 hover:-translate-y-5 border-orange-900 bg-orange-600/50 text-neutral-900"
          >
            <CardContent className="h-full flex items-center justify-between gap-3">
              {item.icon && <item.icon className="size-16" strokeWidth={1} />}

              <Separator orientation="vertical" />
              <div className="flex flex-col gap-3">
                <h1 className="text-2xl font-normal">{item.name}</h1>
                <h3 className="text-5xl text-center">{item.amount}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
      <Card className="bg-transparent! border-0">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold">Your Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.map((order: any) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    #{order.id.slice(0, 8)}
                  </TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{order.items?.length || 0}</TableCell>
                  <TableCell>
                    <Badge
                      className="px-5 py-2 font-semibold"
                      variant={
                        order.status === "Delivered"
                          ? "default"
                          : order.status === "Cancelled"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>${order.totalPrice}</TableCell>
                  <TableCell className="space-x-5">
                    <OrderDeleteAlert
                      disabled={
                        order?.status === "DELIVERED" ||
                        order?.status === "CANCELLED"
                      }
                      data={order?.id}
                    />

                    <Link href={`/orders/${order.id}`}>
                      <TooltipButton
                        icon={ArrowUpRightFromCircle}
                        title="View Order"
                        variant={"default"}
                        size={"icon"}
                      />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="flex items-center justify-between w-full mt-9">
            <PaginationControl
              currentPage={pagination?.page}
              totalPages={pagination?.pages}
              options={{ size: "icon-sm" }}
            />
            <p className="text-md font-semibold tracking-wide">
              Page {pagination?.page} of {pagination?.pages}
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
