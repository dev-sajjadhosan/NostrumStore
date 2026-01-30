"use client";

import React from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  ArrowUpRight,
  PlusCircle,
  Calendar,
  PackageCheck,
  X,
  Package,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const restockSchema = z.object({
  additionalStock: z.number().min(1, "Must add at least 1 unit"),
  expiryDate: z.string().min(1, "New expiry date is required"),
});

type RestockFormValues = z.infer<typeof restockSchema>;

interface RestockModalProps {
  item: {
    id: string;
    name: string;
    stock: number;
    unit: string;
  };
}

export function RestockModal({ item }: RestockModalProps) {
  const [open, setOpen] = React.useState(false);

  const form = useForm({
    defaultValues: {
      additionalStock: 0,
      expiryDate: "",
    } as RestockFormValues,
    validators: {
      onSubmit: restockSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading(`Updating stock for ${item.name}...`);

      try {
        console.log("Sending to Server Action:", {
          id: item.id,
          ...value,
        });

        // await restockAction(item.id, value);

        toast.success("Inventory updated", { id: toastId });
        setOpen(false); 
        form.reset();
      } catch (error) {
        toast.error("Failed to update stock", { id: toastId });
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">
          Restock <ArrowUpRight className="ml-1 size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <PlusCircle className="size-6 text-primary" />
              Restock Medicine
            </DialogTitle>
            <DialogDescription className="text-md">
              Add new stock for{" "}
              <span className="font-semibold text-foreground">{item.name}</span>
              . Current balance: <Badge variant={'outline'} className="px-5 text-md font-semibold">{item.stock} {item.unit}s</Badge>
            </DialogDescription>
            
          </DialogHeader>

          <div className="grid gap-6 py-6">
           
            <form.Field
              name="additionalStock"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Quantity to Add</FieldLabel>
                  <Input
                    id={field.name}
                    type="number"
                    placeholder="Enter amount"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                  />
                  {field.state.meta.isTouched && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )}
            />

            
            <form.Field
              name="expiryDate"
              children={(field) => (
                <Field>
                  <FieldLabel
                    htmlFor={field.name}
                    className="flex items-center gap-2"
                  >
                    <Calendar className="size-3" /> New Batch Expiry
                  </FieldLabel>
                  <Input
                    id={field.name}
                    type="date"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.isTouched && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )}
            />

            <div className="rounded-lg bg-muted/50 p-10 border border-dashed flex items-center justify-around">
              <Package size={70} strokeWidth={1} />
              <div className="flex flex-col items-center gap-1">
                <h3 className="text-3xl text-muted-foreground">
                  New
                  <span className="text-5xl font-semibold text-foreground px-3">
                    {item.stock + (form.state.values.additionalStock || 0)}{" "}
                    {item.unit}s
                  </span>{" "}
                  Stock
                </h3>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="secondary"
              type="button"
              onClick={() => setOpen(false)}
            >
              <X /> Cancel
            </Button>
            <Button type="submit">
              <PackageCheck />
              Confirm Restock
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
