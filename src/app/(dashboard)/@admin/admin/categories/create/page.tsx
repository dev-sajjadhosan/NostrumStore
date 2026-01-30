"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Info, X, Loader2 } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldError } from "@/components/ui/field";
import { toast } from "sonner";

const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description is too short"),
  status: z.enum(["active", "restricted", "inactive"]),
  slug: z.string(),
});

type CategoryForm = z.infer<typeof categorySchema>;

export default function CreateCategoryPage() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      status: "active",
      slug: "",
    },
    validators: {
      onSubmit: categorySchema,
    },
    onSubmit: async ({ value }) => {
      const toastID = toast.loading("Creating Category...");
      try {
        // api call
        toast.success("Category Created.", { id: toastID });
      } catch (err: any) {
        toast.error(err, { id: toastID });
      }
      console.log("Submitting Data:", value);
      await new Promise((r) => setTimeout(r, 1000));
      router.push("/admin/categories");
    },
  });

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");

  return (
    <div className="p-6 w-full mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="rounded-full"
        >
          <ArrowLeft className="size-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Create New Category
          </h1>
          <p className="text-muted-foreground italic text-sm">
            Add a new global classification for the medicine inventory.
          </p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card className="border-muted/40 shadow-sm">
              <CardHeader>
                <CardTitle>Category Details</CardTitle>
                <CardDescription>
                  Enter the name and public description.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form.Field
                  name="name"
                  validators={{ onChange: categorySchema.shape.name }}
                  children={(field) => (
                    <div className="space-y-2">
                      <Label htmlFor={field.name}>Category Name</Label>
                      <Input
                        id={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => {
                          field.handleChange(e.target.value);
                          form.setFieldValue("slug", slugify(e.target.value));
                        }}
                        placeholder="e.g., Pediatric Medicines"
                      />
                      {field.state.meta.errors && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </div>
                  )}
                />
                <form.Field
                  name="description"
                  validators={{ onChange: categorySchema.shape.description }}
                  children={(field) => (
                    <div className="space-y-2">
                      <Label htmlFor={field.name}>Public Description</Label>
                      <Textarea
                        id={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Describe what kind of medicines belong here..."
                        className="min-h-[120px] resize-none"
                      />
                      {field.state.meta.errors && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </div>
                  )}
                />
              </CardContent>

              <CardHeader className="pt-0">
                <CardTitle>Management Settings</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <form.Field
                  name="status"
                  children={(field) => (
                    <div className="space-y-2">
                      <Label>Initial Status</Label>
                      <Select
                        value={field.state.value}
                        onValueChange={(value: any) =>
                          field.handleChange(value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">
                            Active (Visible)
                          </SelectItem>
                          <SelectItem value="restricted">Restricted</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                />

                <form.Field
                  name="slug"
                  children={(field) => (
                    <div className="space-y-2">
                      <Label>Category Slug (URL)</Label>
                      <Input
                        value={field.state.value}
                        disabled
                        className="bg-muted/50"
                      />
                      <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Info className="size-3" /> Auto-generated based on
                        name.
                      </p>
                    </div>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col justify-end space-y-4 h-full pb-2">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit}
                  className="w-full h-12 gap-2"
                >
                  {isSubmitting ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Save className="size-5" />
                  )}
                  Save Category
                </Button>
              )}
            />

            <Button
              type="button"
              variant="secondary"
              onClick={() => router.back()}
              className="w-full h-12 gap-2"
            >
              <X className="size-5" />
              Discard Changes
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
