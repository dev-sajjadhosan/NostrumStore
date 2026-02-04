"use client";

import {
  DollarSign,
  ExternalLink,
  Share2,
  ShoppingBasket,
  Timer,
  Trash2,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";
import { Rating } from "../ui/rating";
import { Button } from "../ui/button";
import { TooltipButton } from "../ui/tooltip-button";
import Link from "next/link";
import { useCart } from "@/context/cart-provider";
import { toast } from "sonner";
import { isRecent } from "@/helpers/is-new-date";
import { useMemo } from "react";

export default function ProductCard({ data }: { data: any }) {
  const { addToCart, isCart, removeFromCart } = useCart();
  const subtotal = data?.price
  return (
    <>
      <Card className="">
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isRecent(data?.createdAt, 30) && (
              <Badge className="text-sm px-3 py-1">New</Badge>
            )}
            <Badge variant={"outline"} className="text-sm px-3 py-1">
              {data?.stock <= 0 ? "Out of Stock" : "Stock"}
            </Badge>
          </div>
          {/* <Badge className="text-sm font-semibold tracking-wider px-3 py-1 [&_svg]:size-4! flex items-center gap-1">
            <Timer /> 10:10:05
          </Badge> */}
        </CardHeader>
        <CardContent className="flex flex-col gap-14 h-full mt-5">
          <Image
            src={data?.image}
            width={200}
            height={300}
            alt="categories"
            className="mx-auto"
          />
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold tracking-wide">
                {data?.name}
              </h3>
              <Badge variant={"outline"}>{data?.group}</Badge>
            </div>
            <p className="text-sm">{data?.description?.slice(0, 90)}</p>
            <div className="flex items-end justify-between relative">
              <div className="flex items-center gap-3">
                <h2 className="text-4xl font-bold">${data?.price}</h2>
                <Badge className="line-through px-3">
                  ${data?.discountPrice}
                </Badge>
              </div>
              <Rating rate={1} />
            </div>
            <div className="flex items-center justify-between mt-5">
              <Link href={`/checkout?id=${data?.id}&qty=1&subtotal=${subtotal}`}>
                <Button size={"lg"}>
                  <DollarSign /> Buy Now
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                {isCart(data?.id) ? (
                  <TooltipButton
                    onClick={() => {
                      removeFromCart(data?.id);
                      toast.success("Cart remove.");
                    }}
                    icon={Trash2}
                    title="Remove from Cart"
                    variant={"secondary"}
                  />
                ) : (
                  <TooltipButton
                    onClick={() => {
                      addToCart({
                        id: data?.id,
                        name: data?.name,
                        image: data?.image,
                        price: data?.price,
                        quantity: 1,
                      });
                      toast.success("Cart added.");
                    }}
                    icon={ShoppingBasket}
                    title="Add To Cart"
                    variant={"default"}
                  />
                )}
                <Link href={`/shop/${data?.id}`}>
                  <TooltipButton icon={ExternalLink} title="View More" />
                </Link>
                {/* <TooltipButton icon={Share2} title="Share" /> */}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
