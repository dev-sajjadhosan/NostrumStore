"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  User,
  Store,
  MapPin,
  CreditCard,
  Download,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CancelOrderDialog } from "@/components/layouts/exist-alert";
import { FlagOrderDialog } from "./flag-order";

export default function OrderDetailsSheet({ order, open, onOpenChange }: any) {
  if (!order) return null;
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showFlagDialog, setShowFlagDialog] = useState(false);

  if (!order) return null;

  const handleCancelConfirm = () => {
    console.log("Order Cancelled:", order.id);
    setShowCancelDialog(false);
    onOpenChange(false); // Optionally close the sheet too
  };
  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="sm:max-w-2xl overflow-y-auto p-6">
          <SheetHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-2xl font-bold">
                Order #{order.id}
              </SheetTitle>
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200"
              >
                {order.status}
              </Badge>
            </div>
            <SheetDescription>
              Placed on {order.date} at 02:45 PM
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-6 mt-6">
            {/* 1. Entity Info: Customer & Vendor */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs uppercase text-muted-foreground font-bold">
                  Customer
                </Label>
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <User className="size-4 text-primary" />
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold">{order.customer}</p>
                    <p className="text-xs text-muted-foreground">
                      ID: CUST-901
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase text-muted-foreground font-bold">
                  Vendor
                </Label>
                <div className="flex items-center gap-2">
                  <div className="bg-amber-100 p-2 rounded-full">
                    <Store className="size-4 text-amber-700" />
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold">{order.vendor}</p>
                    <p className="text-xs text-muted-foreground">ID: VND-001</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* 2. Prescription Section (The "Audit" Work) */}
            <Card className=" rounded-xl space-y-3">
              <CardHeader className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-blue-900 flex items-center gap-2">
                  <FileText className="size-4" /> Prescription Verification
                </h4>
                <Badge className="bg-blue-600">Required</Badge>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed p-7 rounded-2xl flex flex-col items-center gap-2 cursor-pointer hover:bg-accent/50 transition-colors">
                  <FileText className="size-8 text-blue-400" />
                  <p className="text-md font-medium text-blue-700">
                    View_Prescription_Scan.jpg
                  </p>
                  <Button variant="secondary" className="h-11 text-sm mt-5">
                    Preview Image
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 3. Items List */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold underline">Items Ordered</h4>
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center text-sm"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">Napa Extend 665mg</span>
                      <span className="text-xs text-muted-foreground italic">
                        10 Tablets per strip
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">x2</p>
                      <p className="text-xs text-muted-foreground">$30.00</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* 4. Financial Breakdown */}
            <div className="bg-muted/30 p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>$140.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Platform Fee (5%)</span>
                <span className="text-green-600">+$7.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery Charge</span>
                <span>$7.00</span>
              </div>
              <Separator className="my-1" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total Payable</span>
                <span className="text-primary">${order.total}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1 gap-2">
                <Download className="size-4" /> Download Invoice
              </Button>
              <Button variant="outline" size="icon">
                <AlertCircle className="size-4 text-red-500" />
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      {/* <CancelOrderDialog
        open={showCancelDialog}
        onOpenChange={setShowCancelDialog}
        orderId={order.id}
        onConfirm={handleCancelConfirm}
      />

      <FlagOrderDialog
        open={showFlagDialog}
        onOpenChange={setShowFlagDialog}
        orderId={order.id}
      /> */}
    </>
  );
}

function Label({ children, className }: any) {
  return <label className={className}>{children}</label>;
}
