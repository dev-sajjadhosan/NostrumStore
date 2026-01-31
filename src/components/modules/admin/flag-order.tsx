"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function FlagOrderDialog({ open, onOpenChange, orderId }: any) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Flag Order #{orderId} for Review</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Reason for Flagging</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="prescription">Invalid/Blurry Prescription</SelectItem>
                <SelectItem value="fraud">Suspected Fraudulent Account</SelectItem>
                <SelectItem value="vendor">Vendor Compliance Issue</SelectItem>
                <SelectItem value="other">Other Issue</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Internal Notes</Label>
            <Textarea placeholder="Explain the situation for the support team..." />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Discard</Button>
          <Button className="bg-orange-600 hover:bg-orange-700">Apply Flag</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}