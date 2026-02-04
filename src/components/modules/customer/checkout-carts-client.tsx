"use client";

import { useCart } from "@/context/cart-provider";
import CheckoutPageClient from "./checkout-client";

export default function CheckoutCartsClient({
  qty,
  user,
  options,
}: {
  qty: string;
  user?: any;
  options: any;
}) {
  const { cart } = useCart();

  return (
    <>
      <CheckoutPageClient
        medicine={cart}
        user={user}
        quantity={Number(qty)}
        cart={{ ...options }}
      />
    </>
  );
}
