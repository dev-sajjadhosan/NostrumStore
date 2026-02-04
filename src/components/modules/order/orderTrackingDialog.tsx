import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Truck, CheckCircle2, Clock } from "lucide-react";

export function OrderTrackingDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" disabled>
          <Truck className="mr-2 size-4" /> Track Order
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Shipment Tracking</DialogTitle>
          <DialogDescription>
            Real-time updates for Order #ORD-7729
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-0">
          {/* Step 1: Completed */}
          <div className="flex gap-4 group">
            <div className="flex flex-col items-center">
              <div className="z-10 flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <CheckCircle2 className="size-4" />
              </div>
              <div className="w-0.5 h-12 bg-primary" />
            </div>
            <div className="pt-0.5">
              <p className="text-sm font-bold">Order Confirmed</p>
              <p className="text-xs text-muted-foreground">Jan 29, 2026 - 09:00 PM</p>
            </div>
          </div>

          {/* Step 2: Completed */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="z-10 flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Truck className="size-4" />
              </div>
              <div className="w-0.5 h-12 bg-primary" />
            </div>
            <div className="pt-0.5">
              <p className="text-sm font-bold">Picked up by Courier</p>
              <p className="text-xs text-muted-foreground">Jan 30, 2026 - 10:00 AM</p>
            </div>
          </div>

          {/* Step 3: Current (Pulse effect) */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="z-10 flex size-6 items-center justify-center rounded-full border-2 border-primary bg-background">
                <div className="size-2 rounded-full bg-primary animate-pulse" />
              </div>
              <div className="w-0.5 h-12 bg-muted" />
            </div>
            <div className="pt-0.5">
              <p className="text-sm font-bold text-primary">In Transit</p>
              <p className="text-xs text-muted-foreground">Arrived at Dhaka Sorting Hub</p>
            </div>
          </div>

          {/* Step 4: Pending */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="z-10 flex size-6 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <Clock className="size-4" />
              </div>
            </div>
            <div className="pt-0.5">
              <p className="text-sm font-medium text-muted-foreground">Out for Delivery</p>
              <p className="text-xs text-muted-foreground italic">Estimated: Tomorrow</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}