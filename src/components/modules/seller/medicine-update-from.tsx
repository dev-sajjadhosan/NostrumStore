"use client";

import React from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Save,
  X,
  Pill,
  AlertCircle,
  Upload,
  Tag,
  Calendar,
  Trash2,
  ImagePlus,
  Sparkles,
  Hash,
  Pen,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { generateSKU } from "@/helpers/generateSKU";
import { updateMedicineData } from "@/actions/admin.action";
import { useRouter } from "next/navigation";

const medicineSchema = z.object({
  name: z.string().trim().min(2, "Brand name is required"),
  genericName: z.string().trim().min(2, "Generic name is required"),
  description: z.string().trim().min(10, "Provide a detailed description"),
  price: z.number().positive("Price must be greater than 0"),
  discountPrice: z.number().nonnegative().optional().nullable(),
  stock: z.number().min(0),
  strength: z.string().trim().min(1, "Strength is required"),
  categoryId: z.string().min(1, "Category is required"),
  group: z.string().trim().min(1, "Therapeutic group is required"),
  sku: z.string().trim(),
  unitType: z.string().min(1),
  expiryDate: z.string().min(1, "Expiry date is required"),
  tags: z.string(),
  isPrescriptionRequired: z.boolean(),
  image: z.any().optional(),
});

type MedicineFormValues = z.infer<typeof medicineSchema>;

export default function MedicineUpdateForm({
  categories,
  currentData,
}: {
  categories: [];
  currentData: any;
}) {
  const router = useRouter();
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const form = useForm({
    defaultValues: {
      name: currentData?.name,
      image: currentData?.image,
      genericName: currentData?.genericName,
      description: currentData?.description,
      price: currentData?.price,
      discountPrice: currentData?.discountPrice,
      stock: currentData?.stock,
      strength: currentData?.strength,
      categoryId: currentData?.categoryId,
      unitType: currentData?.unitType,
      expiryDate: currentData?.expiryDate,
      sku: currentData?.sku,
      tags: currentData?.tags,
      group: currentData?.group,
      isPrescriptionRequired: currentData?.isPrescriptionRequired,
    } as MedicineFormValues,
    validators: { onSubmit: medicineSchema },
    onSubmitInvalid: async ({ value }) => {
      const toastId = toast.loading("Updating to inventory...");
      try {
        const submissionData = {
          ...value,
          tags:
            typeof value.tags === "string"
              ? value.tags.split(",").map((t) => t.trim())
              : value.tags,
        };

        console.log(submissionData);
        const res = await updateMedicineData(currentData?.id, submissionData);
        toast.success("Medicine updated!", { id: toastId });
          router.push("/seller/medicines");
        return;
      } catch (err: any) {
        toast.error(err.message, { id: toastId });
      }
    },
  });
  return (
    <>
      <div className="grid lg:grid-cols-2 gap-10">
        <Card>
          <CardContent className="h-full flex items-center justify-center">
            <Pill
              size={200}
              strokeWidth={1}
              className="text-orange-500 animate-pulse rotate-45"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="size-5" /> Product Image
            </CardTitle>
            <CardDescription>
              Upload a clear photo of the medicine packaging.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-full">
            <form.Field
              name="image"
              children={(field) => (
                <div className="h-full flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 transition-colors hover:bg-muted/50">
                  {imagePreview ? (
                    <div className="relative w-full aspect-video overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-contain"
                      />
                      <Button
                        type="button"
                        className="absolute bottom-2 left-2 size-8 shadow-md"
                        onClick={() => {
                          setImagePreview(null);
                          field.handleChange("");
                        }}
                      >
                        <Trash2 className="size-5" />
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center space-y-2">
                      <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto">
                        <Upload className="size-6 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-md font-medium">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG or WebP (Max 2MB)
                        </p>
                      </div>
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="image-upload"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setImagePreview(reader.result as string);
                              field.handleChange(file);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <Button
                        type="button"
                        className="mt-3 px-3"
                        onClick={() =>
                          document.getElementById("image-upload")?.click()
                        }
                      >
                        Select File
                        <ImagePlus />
                      </Button>
                    </div>
                  )}
                </div>
              )}
            />
          </CardContent>
        </Card>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          //   e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="w-full">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Pill className="size-7" /> Product Details
              </CardTitle>
            </CardHeader>
            <div className="flex flex-col lg:flex-row items-center gap-10 w-full">
              <div className="w-full space-y-5">
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <form.Field
                      name="name"
                      children={(field) => (
                        <Field>
                          <FieldLabel>Medicine Name</FieldLabel>
                          <Input
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="e.g. Napa Extend"
                          />
                          {field.state.meta.isTouched && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      )}
                    />
                    <form.Field
                      name="genericName"
                      children={(field) => (
                        <Field>
                          <FieldLabel>Generic Name</FieldLabel>
                          <Input
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="e.g. Paracetamol"
                          />
                          {field.state.meta.isTouched && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      )}
                    />
                  </div>

                  <form.Field
                    name="description"
                    children={(field) => (
                      <Field>
                        <FieldLabel>Description & Indications</FieldLabel>
                        <Textarea
                          className="min-h-[100px]"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {field.state.meta.isTouched && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )}
                  />

                  <form.Field
                    name="tags"
                    children={(field) => (
                      <Field>
                        <FieldLabel className="flex items-center gap-2">
                          <Tag className="size-3" /> Tags (comma separated)
                        </FieldLabel>
                        <Input
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Fever, Pain, Adult"
                        />
                      </Field>
                    )}
                  />
                </CardContent>

                <div className="flex flex-col gap-3">
                  <CardHeader>
                    <CardTitle>Pricing & Stock</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <form.Field
                      name="price"
                      children={(field) => (
                        <Field>
                          <FieldLabel>Price ($)</FieldLabel>
                          <Input
                            type="text"
                            value={field.state.value}
                            onChange={(e) =>
                              field.handleChange(parseFloat(e.target.value))
                            }
                            placeholder="0.00"
                          />
                        </Field>
                      )}
                    />
                    <form.Field
                      name="discountPrice"
                      children={(field) => (
                        <Field>
                          <FieldLabel>Discount Price ($)</FieldLabel>
                          <Input
                            value={field.state.value ?? 0}
                            onChange={(e) =>
                              field.handleChange(parseFloat(e.target.value))
                            }
                            placeholder="Optional"
                          />
                        </Field>
                      )}
                    />
                    <form.Field
                      name="unitType"
                      children={(field) => (
                        <Field>
                          <FieldLabel>Unit Type</FieldLabel>
                          <Select
                            onValueChange={field.handleChange}
                            defaultValue={field.state.value}
                          >
                            <SelectTrigger className="rounded-full">
                              <SelectValue placeholder="Select Unit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Pcs">
                                Pcs (Tablet/Capsule)
                              </SelectItem>
                              <SelectItem value="Strip">
                                Strip (Blister Pack)
                              </SelectItem>
                              <SelectItem value="Box">Box / Carton</SelectItem>

                              <SelectItem value="Bottle">
                                Bottle (Syrup/Drops)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </Field>
                      )}
                    />
                    <form.Field
                      name="stock"
                      children={(field) => (
                        <Field>
                          <FieldLabel>Stock Quantity</FieldLabel>
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
                  </CardContent>
                </div>
              </div>
              <div className="flex flex-col gap-9 w-full">
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-5">
                    <form.Field
                      name="categoryId"
                      children={(field) => (
                        <Field>
                          <FieldLabel>Category</FieldLabel>
                          <Select
                            onValueChange={field.handleChange}
                            defaultValue={currentData?.categoryId}
                          >
                            <SelectTrigger className="rounded-full">
                              <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories?.map((c: any, idx: number) => (
                                <SelectItem
                                  value={c?.id}
                                  key={idx}
                                  className={`capitalize `}
                                >
                                  {c?.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {field.state.meta.errors && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      )}
                    />
                    <form.Field
                      name="group"
                      children={(field) => (
                        <Field>
                          <FieldLabel>Therapeutic Group</FieldLabel>
                          <Input
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="e.g. Analgesics / NSAIDs"
                          />
                        </Field>
                      )}
                    />
                  </div>
                  <form.Field
                    name="strength"
                    children={(field) => (
                      <Field>
                        <FieldLabel>Strength</FieldLabel>
                        <Input
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="e.g. 500mg"
                        />
                      </Field>
                    )}
                  />
                  <form.Field
                    name="expiryDate"
                    children={(field) => (
                      <Field>
                        <FieldLabel className="flex items-center gap-2">
                          <Calendar className="size-3" /> Expiry Date
                        </FieldLabel>
                        <Input
                          type="date"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </Field>
                    )}
                  />

                  <form.Field
                    name="isPrescriptionRequired"
                    children={(field) => (
                      <div className="flex items-center justify-between border rounded-lg p-4 bg-muted/30">
                        <Label
                          className="font-semibold cursor-pointer"
                          htmlFor="rx"
                        >
                          Prescription Required
                        </Label>
                        <Switch
                          id="rx"
                          checked={field.state.value}
                          onCheckedChange={field.handleChange}
                        />
                      </div>
                    )}
                  />

                  <form.Field
                    name="sku"
                    children={(field) => (
                      <div className="space-y-2">
                        <Label className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <Hash className="size-4" /> SKU
                          </span>
                          <Button
                            type="button"
                            onClick={() => generateSKU(form)}
                            variant={"ghost"}
                            className=" text-orange-500 hover:text-orange-600 flex items-center gap-1 font-medium"
                          >
                            <Sparkles className="size-3" /> Auto-Generate
                          </Button>
                        </Label>
                        <Input
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Auto or Manual"
                        />
                      </div>
                    )}
                  />
                </CardContent>
              </div>
            </div>
            <CardFooter className="flex justify-end mt-10">
              <Button type="submit" className="text-md" size={"lg"}>
                <Pen className="mr-2 size-5" /> Update Medicine
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </>
  );
}
