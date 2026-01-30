"use client";

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

// Mock Data
const orderDetails = {
  id: "ORD-7729",
  date: "October 24, 2025",
  status: "Shipped",
  paymentStatus: "Paid",
  customer: {
    name: "John Doe",
    email: "john@example.com",
    phone: "+880 1712-345678",
    address: "123 Tech Street, Dhaka, Bangladesh",
  },
  items: [
    { id: 1, name: "Mechanical Keyboard", price: 80.0, qty: 1, total: 80.0 },
    { id: 2, name: "Wireless Mouse", price: 40.0, qty: 2, total: 80.0 },
  ],
  subtotal: 160.0,
  shipping: 10.0,
  tax: 5.0,
  grandTotal: 175.0,
};

export default function OrderViewPage() {
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
            <h1 className="text-2xl font-normal tracking-wide">
              {orderDetails.id}
            </h1>
            <p className="text-sm text-muted-foreground">{orderDetails.date}</p>
          </div>
          <Badge className="ml-2 px-5 py-2 font-semibold text-md">{orderDetails.status}</Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Printer className="mr-2 size-4" /> Print Invoice
          </Button>
          <OrderTrackingDialog/>
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
                <p className="font-semibold">{orderDetails.customer.name}</p>
                <p className="text-muted-foreground">
                  {orderDetails.customer.email}
                </p>
                <p className="text-muted-foreground">
                  {orderDetails.customer.phone}
                </p>
              </div>
              <Separator />
              <div>
                <p className="font-semibold">Shipping Address</p>
                <p className="text-muted-foreground">
                  {orderDetails.customer.address}
                </p>
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
                <span>${orderDetails.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>${orderDetails.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>${orderDetails.tax.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">
                  ${orderDetails.grandTotal.toFixed(2)}
                </span>
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
                    <TableHead className="text-center">Qty</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderDetails.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell className="text-center">{item.qty}</TableCell>
                      <TableCell className="text-right">
                        ${item.price.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        ${item.total.toFixed(2)}
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
