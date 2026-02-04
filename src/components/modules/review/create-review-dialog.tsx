"use client";

import { createReview } from "@/actions/review.action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Rating } from "@/components/ui/rating";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import { Send, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

const reviewSchema = z.object({
  comment: z
    .string()
    .trim()
    .min(10, "Provide a detailed thought about our product or orders."),
  rating: z.number().min(1).max(5),
  deliveryRating: z.number().min(1).max(5),
  productQualityRating: z.number().min(1).max(5),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

export default function CreateReviewOrder({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      comment: "",
      rating: 5,
      deliveryRating: 5,
      productQualityRating: 5,
    } as ReviewFormValues,
    validators: {
      onSubmit: reviewSchema,
    },
    onSubmit: async ({ value }) => {
      const toastID = toast.loading("Creating review...");
      try {
        const data = {
          ...value,
          orderId: id,
        };

        const res = await createReview(data);
    ;
        if (!res?.success) {
          toast.error("Review failed created!", { id: toastID });
        }
        toast.success("Review created!", { id: toastID });
        setOpen(false);
      } catch (err: any) {
        toast.error(err.message || "Failed to create review", { id: toastID });
      }
    },
  });

  return (
    <Dialog onOpenChange={() => setOpen(!open)} open={open}>
      <DialogTrigger asChild>
        <Button size={"lg"}>
          Want to say something? <Star className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl!">
        <DialogTitle className="text-2xl font-semibold tracking-wide">
          Order Review Box
        </DialogTitle>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="flex flex-col gap-6 mt-4"
        >
          <form.Field
            name="comment"
            children={(field) => (
              <Field className="grid gap-2">
                <FieldLabel className="font-medium">Your Feedback</FieldLabel>
                <Textarea
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Tell us about your experience..."
                  className="p-4 border-0 resize-none"
                  rows={4}
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          />

          <div className="grid gap-7 mb-6">
            <form.Field
              name="rating"
              children={(field) => (
                <div className="flex items-center justify-between">
                  <FieldLabel className="text-sm font-medium">
                    Website Experience
                  </FieldLabel>
                  <Input
                    type="number"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    placeholder="Tell us about your experience..."
                    className="p-4 border-0 resize-none w-auto"
                    max={5}
                    min={1}
                  />
                  <div className="flex flex-col items-end">
                    <Rating rate={field.state.value} />
                    <FieldError errors={field.state.meta.errors} />
                  </div>
                </div>
              )}
            />

            <form.Field
              name="deliveryRating"
              children={(field) => (
                <div className="flex items-center justify-between">
                  <FieldLabel className="text-sm font-medium">
                    Delivery Speed
                  </FieldLabel>
                  <Input
                    type="number"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    placeholder="Tell us about your experience..."
                    className="p-4 border-0 resize-none w-auto"
                    max={5}
                    min={1}
                  />
                  <div className="flex flex-col items-end">
                    <Rating rate={field.state.value} />
                    <FieldError errors={field.state.meta.errors} />
                  </div>
                </div>
              )}
            />

            <form.Field
              name="productQualityRating"
              children={(field) => (
                <div className="flex items-center justify-between">
                  <FieldLabel className="text-sm font-medium">
                    Product Quality
                  </FieldLabel>
                  <Input
                    type="number"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    placeholder="Tell us about your experience..."
                    className="p-4 border-0 resize-none w-auto"
                    max={5}
                    min={1}
                  />
                  <div className="flex flex-col items-end">
                    <Rating rate={field.state.value} />
                    <FieldError errors={field.state.meta.errors} />
                  </div>
                </div>
              )}
            />
          </div>

          <Button
            type="submit"
            size={"lg"}
            className="w-full sm:w-auto self-end"
            disabled={form.state.isSubmitting}
          >
            {form.state.isSubmitting ? "Sending..." : "Place Review"}
            <Send className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
