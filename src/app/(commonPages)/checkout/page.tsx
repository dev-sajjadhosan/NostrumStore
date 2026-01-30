"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  Landmark,
  ShoppingCart,
  Truck,
  Wallet,
} from "lucide-react";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const PAYMENT_METHODS = [
  {
    id: "online-payment",
    label: "Online Payment",
    icon: Wallet,
    method: false,
  },
  {
    id: "card-payment",
    label: "Card Payment",
    icon: CreditCard,
    method: false,
  },
  {
    id: "bank-payment",
    label: "Bank Transfer",
    icon: Landmark,
    description: "Transfer directly from your bank account.",
    method: false,
  },
  {
    id: "cod",
    label: "Cash on Delivery",
    icon: Truck,
    method: true,
  },
];
const phoneRegex = /^01[3-9]\d{8}$/;
const billingSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Full name is required")
    .max(50, "Name is too long"),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .regex(phoneRegex, "Enter a valid 11-digit phone number (e.g., 017...)"),

  whatsapp: z
    .string()
    .trim()
    .regex(phoneRegex, "Enter a valid 11-digit phone number (e.g., 017...)"),

  street_address: z
    .string()
    .trim()
    .min(5, "Please provide a specific street address"),

  country: z.string().trim().min(1, "City is required"),
  city: z.string().trim().min(1, "City is required"),

  district: z.string().trim().min(1, "District is required"),
  postcode: z
    .string()
    .trim()
    .regex(/^\d+$/, "Postcode must contain only numbers")
    .min(4, "Postcode must be at least 4 digits"),
});

export default function CheckoutPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const handlePaymentChange = (value: string) => {
    setPaymentMethod(value);
    router.push(pathname + "/" + createQueryString("method", value), {
      scroll: false,
    });
  };

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      whatsapp: "",
      street_address: "",
      country: "",
      city: "",
      district: "",
      postcode: "",
    },
    validators: {
      onSubmit: billingSchema,
    },
    onSubmit: async ({ value }) => {
      const toastID = toast.loading("Sending your message...");
      try {
        console.log({ value });
        //   const res = await fetch("/contact/send-message", {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(value),
        //   });
      } catch (err) {
        toast.error("Failed to send message. Please try again later.", {
          id: toastID,
        });
      }
    },
  });
  const [paymentMethod, setPaymentMethod] = useState("");

  return (
    <div className="mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="lg:col-span-2 space-y-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-normal">
              Billing Details
            </CardTitle>
            <CardDescription>
              Enter your shipping and tax information.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4 w-full">
            <form
              id="billing_form"
              className="w-full"
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit(e);
              }}
            >
              <FieldGroup className="w-full">
                <div className="flex flex-col md:flex-row gap-3 items-center justify-between w-full">
                  <form.Field
                    name="name"
                    children={(field) => {
                      const isValid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field>
                          <FieldLabel htmlFor={field.name}>
                            Full Name
                          </FieldLabel>
                          <Input
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            id={field.name}
                            type="text"
                            placeholder="John Doe"
                            required
                          />
                          {isValid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  />
                  <form.Field
                    name="email"
                    children={(field) => {
                      const isValid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field>
                          <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                          <Input
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            id={field.name}
                            type="email"
                            placeholder="john.doe@gmail.com"
                            required
                          />
                          {isValid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-3 items-center justify-between w-full">
                  <form.Field
                    name="phone"
                    children={(field) => {
                      const isValid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field>
                          <FieldLabel htmlFor={field.name}>
                            Contact Number
                          </FieldLabel>
                          <Input
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            id={field.name}
                            type="text"
                            placeholder="0193265874"
                            required
                          />
                          {isValid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  />
                  <form.Field
                    name="whatsapp"
                    children={(field) => {
                      const isValid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field>
                          <FieldLabel htmlFor={field.name}>
                            WhatsApp (optional)
                          </FieldLabel>
                          <Input
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            id={field.name}
                            type="text"
                            placeholder="Whatsapp number"
                            required
                          />
                          {isValid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-3 items-center justify-between w-full">
                  <form.Field
                    name="street_address"
                    children={(field) => {
                      const isValid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field>
                          <FieldLabel htmlFor={field.name}>
                            Street Address
                          </FieldLabel>
                          <Input
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            id={field.name}
                            type="text"
                            placeholder="Street Address"
                            required
                          />
                          {isValid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  />
                  <form.Field
                    name="city"
                    children={(field) => {
                      const isValid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field>
                          <FieldLabel htmlFor={field.name}>
                            City/Town
                          </FieldLabel>
                          <Input
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            id={field.name}
                            type="text"
                            placeholder="city/town"
                            required
                          />
                          {isValid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-3 items-center justify-between w-full">
                  <form.Field
                    name="district"
                    children={(field) => {
                      const isValid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field>
                          <FieldLabel htmlFor={field.name}>
                            District Address
                          </FieldLabel>
                          <Input
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            id={field.name}
                            type="text"
                            placeholder="District"
                            required
                          />
                          {isValid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  />
                  <form.Field
                    name="postcode"
                    children={(field) => {
                      const isValid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field>
                          <FieldLabel htmlFor={field.name}>
                            PostCode/Zip (optional)
                          </FieldLabel>
                          <Input
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            id={field.name}
                            type="text"
                            placeholder="city/town"
                            required
                          />
                          {isValid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  />
                </div>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1 h-full">
        <Card className="sticky top-6 h-full">
          <CardHeader>
            <CardTitle className="text-3xl">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col justify-between gap-9 h-full">
            <div className="flex flex-col gap-5">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>$120.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>$120.00</span>
              </div>
            </div>

            <RadioGroup
              onValueChange={handlePaymentChange}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {PAYMENT_METHODS.map((method) => {
                const Icon = method.icon;

                return (
                  <Label
                    key={method.id}
                    className={`flex items-center justify-between border-2 rounded-xl p-4 cursor-pointer transition-all hover:bg-accent ${!method.method ? "cursor-not-allowed" : ""}`}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                        value={method.id}
                        disabled={!method.method}
                      />
                      <div className="grid gap-0.5">
                        <span className="font-semibold">{method.label}</span>
                      </div>
                    </div>
                    <Icon className={`size-5`} />
                  </Label>
                );
              })}
            </RadioGroup>
          </CardContent>
          <CardFooter>
            <Button form="billing_form" className="w-full text-lg py-6">
              Place Order <ShoppingCart />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
