"use client";

import React, { useState } from "react";
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
  Send,
  ShoppingCart,
  Truck,
  Wallet,
} from "lucide-react";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";

const PAYMENT_METHODS = [
  {
    id: "online-payment",
    label: "Online Payment",
    icon: Wallet,
    description: "You will be redirected to our secure payment gateway.",
    content: null, // No extra form fields needed
  },
  {
    id: "card-payment",
    label: "Card Payment",
    icon: CreditCard,
    description: "Safe and secure credit card payment.",
    content: (
      <div className="space-y-3 mt-4 animate-in fade-in zoom-in-95 duration-300">
        <Input placeholder="Card Number" />
        <div className="flex gap-2">
          <Input placeholder="MM/YY" />
          <Input placeholder="CVC" />
        </div>
      </div>
    ),
  },
  {
    id: "bank-payment",
    label: "Bank Transfer",
    icon: Landmark,
    description: "Transfer directly from your bank account.",
    content: (
      <div className="mt-4 p-3 bg-primary/5 rounded border border-primary/20 text-sm">
        <p className="font-bold">Nostrum Store Ltd</p>
        <p>IBAN: US12 3456 7890 0000</p>
      </div>
    ),
  },
  {
    id: "cod",
    label: "Cash on Delivery",
    icon: Truck,
    description: "Pay with cash upon arrival.",
    content: null,
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
  const [paymentMethod, setPaymentMethod] = useState("online-payment");
  const selectedMethod = PAYMENT_METHODS.find((m) => m.id === paymentMethod);

  return (
    <div className="mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* LEFT SIDE: Billing & Payment */}
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

        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Choose how you want to pay.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-05 p-4">
              {paymentMethod === "card-payment" && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <FieldSet className="w-full">
                    <FieldGroup>
                      <Field>
                        <FieldLabel htmlFor="card_number">
                          Card Number
                        </FieldLabel>
                        <Input
                          id="card_number"
                          type="text"
                          placeholder="0000 111 2222 0000"
                        />
                      </Field>
                      <div className="grid grid-cols-2 gap-4">
                        <Field>
                          <FieldLabel htmlFor="expire">Expire Date</FieldLabel>
                          <Input id="expire" type="date" placeholder="MM/YY" />
                        </Field>
                        <Field>
                          <FieldLabel htmlFor="security">
                            Security Code
                          </FieldLabel>
                          <Input
                            id="security"
                            type="text"
                            placeholder="*****"
                          />
                        </Field>
                      </div>
                    </FieldGroup>
                  </FieldSet>
                </div>
              )}

              {paymentMethod === "bank-payment" && (
                <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                  <h4 className="font-semibold text-primary">
                    Bank Account Details
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Account Name: Nostrum Store Ltd.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    IBAN: US12 3456 7890 0000
                  </p>
                </div>
              )}

              {paymentMethod === "online-payment" && (
                <p className="text-sm italic animate-pulse">
                  You will be redirected to our secure payment gateway...
                </p>
              )}

              {paymentMethod === "cod" && (
                <p className="text-sm text-muted-foreground">
                  Please have the exact amount ready upon delivery.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* RIGHT SIDE: Summary */}
      <div className="lg:col-span-1">
        <Card className="sticky top-6">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
            <RadioGroup
              defaultValue="online-payment"
              onValueChange={setPaymentMethod}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {PAYMENT_METHODS.map((method) => {
                const Icon = method.icon;
                const isSelected = paymentMethod === method.id;

                return (
                  <Label
                    key={method.id}
                    className={`flex items-center justify-between border-2 rounded-xl p-4 cursor-pointer transition-all hover:bg-accent ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-muted"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value={method.id} />
                      <div className="grid gap-0.5">
                        <span className="font-semibold">{method.label}</span>
                      </div>
                    </div>
                    <Icon
                      className={`size-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`}
                    />
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
