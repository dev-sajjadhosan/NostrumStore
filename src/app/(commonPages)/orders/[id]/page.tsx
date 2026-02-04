import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Printer, Truck } from "lucide-react";
import Link from "next/link";
import { OrderTrackingDialog } from "@/components/modules/order/orderTrackingDialog";
import { singleOrderData } from "@/actions/admin.action";
import Image from "next/image";

export default async function OrderViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await singleOrderData(id);

  const order = data?.data;

  console.log(data);

  return (
    <div className="w-11/12 mx-auto p-6 space-y-6">
      <div className="flex justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/orders">
              <ChevronLeft className="size-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-normal tracking-wide">{order?.id}</h1>
            <p className="text-sm text-muted-foreground">{order?.date}</p>
          </div>
          <Badge className="ml-2 px-5 py-2 font-semibold text-md">
            {order?.status}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" disabled>
            <Printer className="mr-2 size-4" /> Print Invoice
          </Button>
          <OrderTrackingDialog />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-5">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl">Customer Details</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-4">
              <div>
                <p className="font-semibold">{order.customer?.name}</p>
                <p className="text-muted-foreground">{order.customer?.email}</p>
                <p className="text-muted-foreground">{order.customer?.phone}</p>
              </div>
              <Separator />
              <div>
                <p className="font-semibold">Shipping Address</p>
                <p className="text-muted-foreground">{order?.address}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/50 w-full">
            <CardHeader>
              <CardTitle className="text-2xl">Payment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${order.Subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>${order.Shipping}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>${order.Tax}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">${order.grandTotal}</span>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-full h-full">
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Picture</TableHead>
                    <TableHead className="text-center">Qty</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item: any) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item?.medicine?.name}
                      </TableCell>
                      <TableCell className="font-medium">
                        <Image
                          src={item?.medicine?.image}
                          alt={item?.medicine?.name}
                          width={50}
                          height={50}
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-right">
                        ${item.priceAtPurchase}
                      </TableCell>
                      <TableCell className="text-right">
                        ${Number(item.priceAtPurchase) * item?.quantity}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
