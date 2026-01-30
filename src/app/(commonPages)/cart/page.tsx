"use client";

import PaginationControl from "@/components/shared/pagination";
import QuantityControl from "@/components/shared/quantity-control";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TooltipButton } from "@/components/ui/tooltip-button";
import {
  BadgeDollarSign,
  Calculator,
  ShoppingBasket,
  ShoppingCart,
  Tag,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CartPage() {
  const unitPrice = 20.0;

  // 1. Initialize state as an array of objects
  const items = [
    { id: 1, name: "Aspirin", price: 20.0, quantity: 1 },
    { id: 2, name: "Paracetamol", price: 20.0, quantity: 1 },
    { id: 3, name: "Vitamin C", price: 20.0, quantity: 1 },
    { id: 4, name: "Bandages", price: 20.0, quantity: 1 },
    { id: 5, name: "Antacid", price: 20.0, quantity: 1 },
  ];

  return (
    <>
      <div className="w-11/12 mx-auto flex flex-col  gap-28">
        <Card className="lg:h-100">
          <CardContent className="h-full flex flex-col gap-10 lg:flex-row items-center justify-around">
            <ShoppingBasket
              // size={200}
              strokeWidth={1}
              className="text-orange-700 animate-pulse size-48 lg:size-64"
            />

            <h1 className="text-8xl font-bold mb-4">Cart</h1>
          </CardContent>
        </Card>
        <section className="flex flex-col gap-9 w-full">
          <div className="flex w-full">aa</div>
          <div className="flex items-start justify-between gap-15 w-full">
            <div className="w-full border p-5 rounded-xl">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="md:w-20"></TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="md:w-xs text-center">
                      Quantity
                    </TableHead>
                    <TableHead>Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item: any) => (
                    <TableRow key={item.id || item}>
                      <TableCell>
                        <TooltipButton
                          icon={Trash2}
                          title="Remove"
                          variant="secondary"
                        />
                      </TableCell>
                      <TableCell className="flex gap-3 items-center">
                        <Image
                          src="/vercel.svg"
                          alt={item.name}
                          width={40}
                          height={40}
                        />
                        <h1 className="font-semibold">
                          {item.name || "Unknown"}
                        </h1>
                      </TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <QuantityControl
                          price={item.price}
                          initialQuantity={item.quantity}
                          // onUpdate={({ quantity }) =>
                          //   handleQuantityChange(item.id, quantity)
                          // }
                        />
                      </TableCell>
                      {/* FIX: Now only shows the subtotal for THIS specific item */}
                      <TableCell className="font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex items-center justify-between mt-9">
                <PaginationControl
                  currentPage={1}
                  totalPages={5}
                  options={{ size: "icon-sm" }}
                />
                <p className="text-md font-semibold tracking-wide">
                  Page {1} of {5}
                </p>
              </div>
            </div>
            <Card className="border-0 w-2xl h-140 p-5">
              <CardHeader className="flex items-center gap-3 text-muted-foreground">
                <ShoppingCart />
                <CardTitle className="text-2xl font-medium">
                  Cart Totals
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col mt-5">
                <div className="flex items-center justify-between gap-5">
                  <h3 className="text-lg font-medium">SubTotal</h3>
                  <span className="text-md font-semibold">$197.02</span>
                </div>
                <div className="flex flex-col gap-5 my-5">
                  <h3 className="text-lg font-medium">Shipping</h3>
                  <RadioGroup defaultValue="comfortable" className="w-fit">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="default" id="r1" />
                      <Label htmlFor="r1">Free Shipping</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="comfortable" id="r2" />
                      <Label htmlFor="r2">Flat rate</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Separator />
                <div className="flex items-center justify-between gap-5 mt-5">
                  <h3 className="text-lg font-medium">Total</h3>
                  <span className="font-semibold">$40.00</span>
                </div>
                <div className="mt-15 w-full flex flex-col gap-7">
                  <div className="grid grid-cols-2 gap-5 w-full">
                    <Button variant={"secondary"}>
                      <Calculator /> Calculate
                    </Button>
                    <Button variant={"secondary"}>
                      {" "}
                      <Tag /> Use Coupon
                    </Button>
                  </div>
                  <Link href={"/checkout"}>
                    <Button>
                      <BadgeDollarSign /> Proceed to checkout
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
}
