"use client";

import { updateMedicineStock } from "@/actions/admin.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { TooltipButton } from "@/components/ui/tooltip-button";
import { useForm } from "@tanstack/react-form";
import { PackagePlus } from "lucide-react";
import { toast } from "sonner";
import * as z from "zod";

const medicineSchema = z.object({
  stock: z.number().min(0),
});
type MedicineFormValues = z.infer<typeof medicineSchema>;

export default function UpdateMedicineStock({ data }: { data: any }) {
  const form = useForm({
    defaultValues: {
      stock: data?.stock,
    } as MedicineFormValues,
    validators: { onSubmit: medicineSchema },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating Stock to inventory...");
      try {
        const submissionData = {
          ...value,
        };

        console.log(submissionData);
        const res = await updateMedicineStock(data?.id, submissionData);
        toast.success("Medicine stock updated!", { id: toastId });
        // router.push("/seller/medicines");
        return;
      } catch (err: any) {
        toast.error(err.message, { id: toastId });
      }
    },
  });
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <TooltipButton icon={PackagePlus} title=" Add stock" size={"icon"} />
        </DialogTrigger>
        <DialogContent className="md:max-w-3xl! h-105 flex flex-col justify-center">
          <DialogHeader>
            <div className="text-left">
              <h1 className="text-3xl font-normal capitalize">{data?.name}</h1>
              <Badge
                className="text-sm font-semibold uppercase mt-1 px-5 py-1"
                variant={"secondary"}
              >
                {data?.category?.name}
              </Badge>
            </div>
            <DialogDescription className="p-7">
              <p className="text-lg text-center font-semibold tracking-wide capitalize mb-3">
                current amount: {data?.stock}
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  //   e.stopPropagation();
                  form.handleSubmit();
                }}
                className="max-w-md mx-auto flex flex-col items-center gap-5"
              >
                <form.Field
                  name="stock"
                  children={(field) => (
                    <Field>
                      <FieldLabel>Stock Quantity Update</FieldLabel>
                      <Input
                        type="number"
                        value={field.state.value}
                        onChange={(e) =>
                          field.handleChange(Number(e.target.value))
                        }
                      />
                    </Field>
                  )}
                />
                <Button size={"lg"} type="submit">
                  <PackagePlus /> Update Stock
                </Button>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
