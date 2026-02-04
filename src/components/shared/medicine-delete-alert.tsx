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

import { LucideIcon, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { deleteMedicine } from "@/actions/admin.action";

interface AlertProps {
  icon?: LucideIcon;
  data: any;
}

export default function DeleteAlert({
  icon: Icon = Trash2,
  data,
}: AlertProps) {
  const handleDelete = async (id: string) => {
    const toastID = toast.loading("Deleting Medicine...");
    try {
      await deleteMedicine(id);
      toast.success("Medicine Deleted.", { id: toastID });
    } catch (err: any) {
      toast.error(err.message, { id: toastID });
    }
  };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size={"icon"} variant={"ghost"}>
            {<Icon />}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account from our servers.
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
