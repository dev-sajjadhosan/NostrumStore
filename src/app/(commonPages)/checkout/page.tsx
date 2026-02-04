import CheckoutPageClient from "@/components/modules/customer/checkout-client";
import { getSingleMedicine } from "@/actions/user.actions";
import { useCart } from "@/context/cart-provider";
import CheckoutCartsClient from "@/components/modules/customer/checkout-carts-client";
import { userService } from "@/services/user.service";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{
    id: string;
    qty: string;
    subtotal: string;
    total: string;
    shipping: string;
    cart: string;
  }>;
}) {
  const { id, qty, cart, subtotal, shipping, total } = await searchParams;
  const medicine = await getSingleMedicine(id);
  const { data } = await userService.getSession();
  const user = data?.user;

  console.log(medicine?.data);

  if (cart === "true") {
    return (
      <CheckoutCartsClient
        qty="qty"
        user={user}
        options={{ subtotal, shipping, total, cart }}
      />
    );
  }


  return (
    <>
      <CheckoutPageClient
        medicine={[medicine?.data?.data]}
        quantity={Number(qty)}
        user={user}
        cart={{ subtotal, shipping, total, cart }}
      />
    </>
  );
}
