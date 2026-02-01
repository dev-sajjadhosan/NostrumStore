import { updateCategory } from "@/actions/admin.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Loader2, Pen, Pencil, Save } from "lucide-react";
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
      name: category?.name,
      description: category?.description,
      status: category?.status,
    },
    validators: {
      onSubmit: categorySchema,
    },
    onSubmit: async ({ value }) => {
      const toastID = toast.loading("Updating Category...");
      try {
        const res = await updateCategory(category?.id, value);
        console.log(res);
        if (res.data) {
          toast.success("Category Updated.", { id: toastID });
        } 
      } catch (err: any) {
        toast.error("Failed to Updating category. Try later!", { id: toastID });
      }
    },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>
          <Pencil className="mr-2 size-4" /> Edit Category
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl!">
        <DialogHeader>
          <DialogTitle>Update Your Category Content</DialogTitle>
        </DialogHeader>
        <div className="mt-5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <Card className="border-0 bg-transparent! w-full">
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
                        <SelectTrigger className="rounded-full">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ACTIVE">
                            Active (Visible)
                          </SelectItem>
                          <SelectItem value="RESTRICTED">Restricted</SelectItem>
                          <SelectItem value="INACTIVE">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                />
              </CardContent>
              <CardFooter>
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
                        <Pen className="size-5" />
                      )}
                      Update Category
                    </Button>
                  )}
                />
              </CardFooter>
            </Card>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
