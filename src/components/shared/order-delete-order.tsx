"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { LucideIcon, PackageX, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { deleteOrder } from "@/actions/user.actions";
import { Tooltip } from "../ui/tooltip";
import { TooltipButton } from "../ui/tooltip-button";

interface AlertProps {
  icon?: LucideIcon;
  data: any;
  disabled?: boolean;
}

export default function OrderDeleteAlert({
  icon: Icon = Trash2,
  disabled,
  data,
}: AlertProps) {
  const handleDelete = async (id: string) => {
    const toastID = toast.loading("Canceling Order...");
    try {
      await deleteOrder(id);
      toast.success("Order Canceling.", { id: toastID });
    } catch (err: any) {
      toast.error(err.message, { id: toastID });
    }
  };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <TooltipButton
            disabled={disabled}
            title="Cancel Order"
            icon={PackageX}
          />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-md">
              This action cannot be undone. This will permanently cancelled your
              Order from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete(data)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
