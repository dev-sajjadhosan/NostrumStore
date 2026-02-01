import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import { Loader2, Pencil, Save } from "lucide-react";
import { toast } from "sonner";
import * as z from "zod";

const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description is too short"),
  status: z.enum(["ACTIVE", "RESTRICTED", "INACTIVE"]),
});

export default function CategoryUpdateModal({ category }: { category: any }) {
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      status: "ACTIVE",
    },
    validators: {
      onSubmit: categorySchema,
    },
    onSubmit: async ({ value }) => {
      const toastID = toast.loading("Creating Category...");
      try {
        const res = (await {}) as any;
        console.log(res);
        if (res.data) {
          toast.success("Category Created.", { id: toastID });
        } else {
          toast.warning("Category already exist", { id: toastID });
        }
      } catch (err: any) {
        toast.error("Failed to create category. Try later!", { id: toastID });
      }
    },
  });
  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          <Pencil className="mr-2 size-4" /> Edit Category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
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
                        validators={{
                          onChange: categorySchema.shape.description,
                        }}
                        children={(field) => (
                          <div className="space-y-2">
                            <Label htmlFor={field.name}>
                              Public Description
                            </Label>
                            <Textarea
                              id={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
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
                                <SelectItem value="ACTIVE">
                                  Active (Visible)
                                </SelectItem>
                                <SelectItem value="RESTRICTED">
                                  Restricted
                                </SelectItem>
                                <SelectItem value="INACTIVE">
                                  Inactive
                                </SelectItem>
                              </SelectContent>
                            </Select>
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
                </div>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
