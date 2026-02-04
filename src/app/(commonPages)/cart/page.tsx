"use client";

import { useMemo, useState } from "react";
import PageBanner from "@/components/shared/page-banner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TooltipButton } from "@/components/ui/tooltip-button";
import { useCart } from "@/context/cart-provider";
import {
  BadgeDollarSign,
  Minus,
  Pill,
  Plus,
  ShoppingBasket,
  ShoppingCart,
  Tag,
  Trash2,
  TrashIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const [shippingCost, setShippingCost] = useState<number>(0);

  const subtotal = useMemo(() => {
    return cart.reduce(
      (acc: number, item: any) => acc + Number(item.price) * item.quantity,
      0,
    );
  }, [cart]);

  const total = subtotal + shippingCost;

  if (cart.length === 0) {
    return (
      <Card className="w-11/12 mx-auto h-[500px] mt-10">
        <CardContent className="flex flex-col items-center text-center justify-center gap-2 h-full">
          <ShoppingBasket
            size={150}
            strokeWidth={1}
            className="text-muted-foreground opacity-20"
          />
          <h1 className="text-3xl font-bold">Your cart is empty</h1>
          <h2 className="text-lg text-muted-foreground mb-5">
            Looks like you haven&apos;t added anything to your cart yet.
          </h2>
          <Link href="/shop">
            <Button size="lg" className="rounded-full px-8">
              Back to Shop <Pill />
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-11/12 mx-auto flex flex-col gap-16 py-10">
      <PageBanner name="Shopping Cart" icon={ShoppingBasket} />

      <section className="flex flex-col gap-9 w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-normal">
            Product in Cart ({cart.length})
          </h2>
          <Button
            variant="outline"
            className="text-destructive hover:bg-destructive/10"
            onClick={() => {
              clearCart();
              toast.success("Cart cleared");
            }}
          >
            <TrashIcon className="mr-2 size-4" />
            Clear Cart
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-10 w-full">
        
          <div className="w-full border rounded-xl bg-card overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-right">Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <TooltipButton
                        icon={Trash2}
                        title="Remove"
                        variant="ghost"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => {
                          removeFromCart(item.id);
                          toast.success(`${item.name} removed`);
                        }}
                      />
                    </TableCell>
                    <TableCell className="flex gap-4 items-center py-4">
                      <div className="relative size-16 border rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.png"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-medium line-clamp-2 max-w-[200px]">
                        {item.name}
                      </span>
                    </TableCell>
                    <TableCell>${Number(item.price).toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-3 border rounded-full px-5 py-2 w-fit mx-auto bg-background">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 rounded-full"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        >
                          <Minus size={14} />
                        </Button>
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 rounded-full"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={14} />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="font-bold text-right">
                      ${(Number(item.price) * item.quantity).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

         
          <Card className="w-full lg:w-[450px] sticky top-5 shadow-sm">
            <CardHeader className="border-b bg-muted/20">
              <div className="flex items-center gap-2">
                <ShoppingCart className="size-5 text-primary" />
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col pt-6 gap-6">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-lg font-semibold">${subtotal.toFixed(2)}</span>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Shipping Method
                </h3>
                <RadioGroup 
                  defaultValue="0" 
                  className="gap-3"
                  onValueChange={(val) => setShippingCost(Number(val))}
                >
                  <div className="flex items-center justify-between space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="0" id="free" />
                      <Label htmlFor="free" className="cursor-pointer">Free Shipping</Label>
                    </div>
                    <span className="text-sm font-medium text-green-600">$0.00</span>
                  </div>
                  <div className="flex items-center justify-between space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="10" id="flat" />
                      <Label htmlFor="flat" className="cursor-pointer">Flat Rate</Label>
                    </div>
                    <span className="text-sm font-medium">$10.00</span>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Total</h3>
                <div className="text-right">
                  <span className="text-2xl font-black text-primary">
                    ${total.toFixed(2)}
                  </span>
                  <p className="text-xs text-muted-foreground">Taxes calculated at checkout</p>
                </div>
              </div>

              <div className="space-y-5 w-full">
                {/* <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Tag className="mr-2 size-4" /> Coupon
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Apply
                  </Button>
                </div> */}
                <Link href={`/checkout?cart=true&subtotal=${subtotal}&total=${total}&shipping=${shippingCost}`}>
                  <Button size={'lg'} className="w-full">
                    <BadgeDollarSign />
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}