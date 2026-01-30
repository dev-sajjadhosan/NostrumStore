"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Eye,
  FileText,
  MapPin,
  Phone,
  Package,
  Truck,
  CheckCircle,
  ExternalLink,
  ArrowBigRightDash,
  PackageX,
  ArrowBigDownDash,
} from "lucide-react";

export function OrderDetailsModal({ order }: { order: any }) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Eye />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl! p-0 overflow-hidden">
        <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-mono">
                {order.id}
              </DialogTitle>
              <p className="text-sm text-muted-foreground">
                Placed on {order.date}
              </p>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <p className="font-semibold flex items-center gap-2">
                  <MapPin className="size-3 text-primary" /> Delivery Address
                </p>
                <p className="text-muted-foreground">
                  123 Green Road, Dhanmondi
                  <br />
                  Dhaka, Bangladesh
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold flex items-center gap-2">
                  <Phone className="size-3 text-primary" /> Contact
                </p>
                <p className="text-muted-foreground">
                  {order.customer}
                  <br />
                  +880 1712-345678
                </p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-bold flex items-center gap-2">
                <Package className="size-4" /> Ordered Medicines
              </h4>
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-muted/30 p-3 rounded-lg border border-dashed"
                  >
                    <div>
                      <p className="font-medium text-sm">Napa Extend 665mg</p>
                      <p className="text-xs text-muted-foreground">
                        Qty: 2 • $15.50 each
                      </p>
                    </div>
                    <p className="font-bold text-sm">$31.00</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold flex items-center gap-2">
                <FileText className="size-4 text-blue-600" /> Prescription
                Verification
              </h4>
              <div className="relative group aspect-video bg-black/5 rounded-xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400"
                  alt="Prescription"
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                />
                <Button variant="secondary" className="absolute shadow-xl h-15">
                  Open Full Screen
                  <ExternalLink className="mr-2 size-4" />
                </Button>
              </div>
            </div>
            <Button
              className="h-15 w-full md:hidden"
              onClick={() => setOpen(!open)}
            >
              Manage Order Status <ArrowBigRightDash />
            </Button>
          </div>

          <div
            className={`${open ? "flex" : "hidden md:flex"} w-full h-full md:w-sm bg-muted/30 border-l p-6 lg:flex flex-col justify-between`}
          >
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Current Status
                </label>
                <div className="mt-2">
                  <Badge className="w-full justify-center py-3 text-md font-semibold ">
                    {order.status}
                  </Badge>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Financial Summary
                </label>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>$1,200.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery</span>
                    <span>$50.00</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg text-primary">
                    <span>Total</span>
                    <span>${order.total}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ">
                  Update Progress
                </label>
                <Button className="w-full gap-3 h-15 mt-3" variant="secondary">
                  Mark as Shipped
                  <Truck className="size-5! text-purple-600" />
                </Button>
                <Button className="w-full gap-3 h-15 mt-5" variant="secondary">
                  <CheckCircle className="size-5! text-green-600" />
                  Mark as Delivered
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-1 gap-10">
              <Button
                onClick={() => setOpen(!open)}
                variant="secondary"
                className="h-15 w-full md:hidden"
              >
                Close <ArrowBigDownDash />
              </Button>
              <Button className="h-15 w-full">
                <PackageX /> Cancel Order
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
