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
import { createOrder } from "@/actions/user.actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCart } from "@/context/cart-provider";
import { Badge } from "@/components/ui/badge";
import { env } from "@/env";

const PAYMENT_METHODS = [
  {
    id: "online-payment",
    label: "Online Payment",
    icon: Wallet,
    available: false,
  },
  {
    id: "card-payment",
    label: "Card Payment",
    icon: CreditCard,
    available: false,
  },
  {
    id: "bank-payment",
    label: "Bank Transfer",
    icon: Landmark,
    available: false,
  },
  { id: "cod", label: "Cash on Delivery", icon: Truck, available: true },
];

const TAX_RATE = env.NEXT_PUBLIC_TAX_RATE;

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

interface CheckoutProps {
  medicine: any;
  quantity: number;
  user: any;
  cart: { subtotal: string; total: string; shipping: string; cart: string };
}

export default function CheckoutPageClient({
  medicine,
  quantity,
  user,
  cart: opCard,
}: CheckoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [paymentMethod, setPaymentMethod] = useState(
    searchParams.get("method") || "",
  );

  // const subtotal = medicine ? Number(medicine.price) * quantity : 0;
  const subtotal = Number(opCard.subtotal);
  const shipping = Number(opCard.shipping) || 0;
  const taxAmount = subtotal * Number(TAX_RATE);
  const [shippingCost, setShippingCost] = useState<number>(shipping);

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
    router.push(pathname + "?" + createQueryString("method", value), {
      scroll: false,
    });
  };

  const form = useForm({
    defaultValues: {
      name: "mohammad",
      email: "mohammad@gmail.com",
      phone: "0174822036589",
      whatsapp: "0174523698546",
      street_address: "address",
      country: "country",
      city: "city",
      district: "district",
      postcode: "01236",
    },
    validators: {
      onSubmit: billingSchema,
    },
    onSubmitInvalid: async ({ value }) => {
      if (!paymentMethod) {
        return toast.error("Please select a payment method");
      }

      const toastID = toast.loading("Processing your order...");

      const items: any = [];
      medicine.map((med: any) => {
        items.push({
          id: med?.id,
          name: med?.name,
          image: med?.image,
          price: med?.price,
          quantity: med?.quantity || quantity,
        });
      });

      try {
        const fullAddress = `${value.street_address}, ${value.district}, ${value.city}, ${value.postcode}, ${value.country}`;

        const orderPayload = {
          address: fullAddress,
          phone: value.phone,
          whatsapp: value.whatsapp,
          Shipping: shippingCost,
          Subtotal: subtotal,
          Tax: taxAmount,
          grandTotal: subtotal + shippingCost,
          items,
          payment: paymentMethod,
        };
        const res = await createOrder(orderPayload);
        toast.success("Order placed successfully!", { id: toastID });
        router.push(
          `/checkout/method=success?user=${user?.name}&address=${value.street_address}&id=${res?.data?.data?.id}`,
        );
      } catch (err) {
        console.log(err);
        toast.error("Failed to place order.", { id: toastID });
      }
    },
  });

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
        <div className="border p-5 rounded-2xl space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Your Products</h3>
            <Badge>{medicine?.length}</Badge>
          </div>
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>

                <TableHead>Quantity</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medicine?.map((item: any) => (
                <TableRow key={item?.id}>
                  {/* <TableCell>
                    <TooltipButton
                      icon={Trash2}
                      title="Remove"
                      variant="ghost"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => {
                        removeFromCart(item.id);
                        toast.success(`${item.name} removed`);
                      }}
                    />
                  </TableCell> */}
                  <TableCell className="flex gap-4 items-center py-2">
                    <div className="relative size-16 border rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={item?.image || "/placeholder.png"}
                        alt={item?.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="font-medium line-clamp-2 max-w-[200px]">
                      {item?.name}
                    </span>
                  </TableCell>
                  <TableCell>${Number(item?.price).toFixed(2)}</TableCell>
                  <TableCell>{Number(item?.quantity) || quantity}</TableCell>

                  <TableCell className="font-bold text-right">
                    $
                    {(
                      Number(item?.price) * (item?.quantity || quantity)
                    ).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button size={"lg"}>
            <ShoppingCart />
            Buy More
          </Button>
        </div>
      </div>
      <div className="space-y-6">
        <Card className="sticky top-6">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Shipping Method
              </h3>
              <RadioGroup
                defaultValue={shipping.toString()}
                className="gap-3"
                onValueChange={(val) => setShippingCost(Number(val))}
              >
                <div className="flex items-center justify-between space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="0" id="free" />
                    <Label htmlFor="free" className="cursor-pointer">
                      Free Shipping
                    </Label>
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    $0.00
                  </span>
                </div>
                <div className="flex items-center justify-between space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="10" id="flat" />
                    <Label htmlFor="flat" className="cursor-pointer">
                      Flat Rate
                    </Label>
                  </div>
                  <span className="text-sm font-medium">$10.00</span>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span className="text-green-600">
                  {shippingCost == 0 ? "Free" : shippingCost}{" "}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Grand Total</span>
                <span>${subtotal + shippingCost}</span>
              </div>
            </div>

            <Separator />

            <div>
              <Label className="text-base mb-4 block">Payment Method</Label>
              <RadioGroup
                value={paymentMethod}
                onValueChange={handlePaymentChange}
                className="grid grid-cols-1 gap-3"
              >
                {PAYMENT_METHODS.map((method) => {
                  const Icon = method.icon;
                  return (
                    <Label
                      key={method.id}
                      className={`flex items-center justify-between border-2 rounded-xl p-4 cursor-pointer transition-all hover:bg-accent 
                        ${paymentMethod === method.id ? "border-primary bg-primary/5" : "border-muted"} 
                        ${!method.available ? "opacity-50 cursor-not-allowed grayscale" : ""}`}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem
                          value={method.id}
                          disabled={!method.available}
                        />
                        <span className="font-medium">{method.label}</span>
                      </div>
                      <Icon className="size-5 text-muted-foreground" />
                    </Label>
                  );
                })}
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              form="billing_form"
              className="w-full text-lg h-12 gap-2"
              disabled={!paymentMethod}
            >
              Confirm Order <ShoppingCart className="size-5" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
