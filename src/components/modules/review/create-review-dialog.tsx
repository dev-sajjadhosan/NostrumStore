
import { createReview } from "@/actions/review.action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import { Send, Star } from "lucide-react";
import { toast } from "sonner";
import * as z from "zod";

const reviewSchema = z.object({
  message: z.string().trim().min(10, "Provide a detailed description"),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

export default function CreateReviewOrder({ id }: { id: string }) {
  const form = useForm({
    defaultValues: {
      message: "",
    } as ReviewFormValues,
    validators: {
      onSubmit: reviewSchema,
    },
    onSubmit: async ({ value }) => {
      const toastID = toast.loading("Creating review...");
      try {
        const res = await createReview(value);
        console.log(res);
        toast.success("Review created!");
      } catch (err: any) {
        toast.error(err.message, { id: toastID });
      }
    },
  });
  return (
    <>
      <Dialog>
        <DialogTrigger>
          Create Review <Star />
        </DialogTrigger>
        <DialogContent className="max-w-3xl!">
          <DialogHeader className="text-2xl font-semibold tracking-wide">
            Write Your Review Here
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <form.Field
              name="message"
              children={(field) => (
                <Field>
                  <FieldLabel>Image Url Name</FieldLabel>
                  <Textarea
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                    placeholder="Write Your Review Here"
                  />
                  {field.state.meta.isTouched && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )}
            />
            <Button type="submit">
              Send <Send />
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
