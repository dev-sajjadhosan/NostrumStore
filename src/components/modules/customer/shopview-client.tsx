"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";

import review from "../../../../public/review.svg";
import vercel from "../../../../public/vercel.svg";
import { Badge } from "@/components/ui/badge";
import {
  BriefcaseMedical,
  DollarSign,
  InfoIcon,
  Minus,
  Plus,
  Share2,
  ShoppingBasket,
  TableOfContents,
  Timer,
  Trash2,
  UserStar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TooltipButton } from "@/components/ui/tooltip-button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";
import ReviewComponent from "@/components/modules/shopPage/review";
import OverviewComponent from "@/components/modules/shopPage/overview";
import { useParams, useSearchParams } from "next/navigation";
import { isRecent } from "@/helpers/is-new-date";
import ProductTimer from "@/components/shared/product-timer";
import { useCart } from "@/context/cart-provider";
import Link from "next/link";
import { toast } from "sonner";

export default function ShopViewClient({
  data,
  reviews,
}: {
  data: any;
  reviews: any;
}) {
  const [quantity, setQuantity] = useState<number>(1);
  const [tab, setTab] = useState("overview");
  const { addToCart, isCart, removeFromCart } = useCart();

  const totalMoney = Number(data?.price) * quantity;

  return (
    <>
      <div className="w-11/12 mx-auto flex flex-col gap-24">
        <section className="flex items-start gap-10 justify-between w-full h-full">
          <Card>
            <CardContent className="p-9">
              <Image src={data?.image} alt="Picture" width={400} height={400} />
            </CardContent>
            {/* <CardFooter className="flex items-center justify-center gap-3">
              {Array.from({ length: 4 }).map((_, idx) => (
                <Image
                  key={idx}
                  className={`shrink-0 border p-2 rounded-xl cursor-pointer active:scale-95`}
                  src={review}
                  alt="image"
                  width={100}
                  height={100}
                />
              ))}
            </CardFooter> */}
          </Card>
          <div className="w-3/5 h-full! flex flex-col justify-between items-start p-9">
            <div className="flex flex-col w-full">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center justify-between gap-2">
                  {isRecent(data?.createdAt, 30) && (
                    <Badge className="text-sm px-3 py-1">New</Badge>
                  )}

                  <Badge variant={"outline"} className="text-sm px-3 py-1">
                    {data?.stock <= 0 ? "Out of Stock" : "Stock"}
                  </Badge>
                </div>
                <ProductTimer data={data} />
              </div>
              <h1 className="text-3xl font-semibold mt-5">
                {data?.name} – <Badge>{data?.strength}</Badge>
              </h1>
              <div className="flex items-center gap-3 mt-3">
                <p className="text-md font-semibold text-muted-foreground">
                  Product Owner -
                </p>
                <Badge
                  className="text-md px-5 font-semibold"
                  variant={"secondary"}
                >
                  {data?.seller?.name}
                </Badge>
              </div>
              <p className="text-md font-normal tracking-wider mt-7">
                {data?.description}
              </p>
            </div>
            <div className="flex flex-col w-full my-auto">
              <div className="flex items-center justify-between w-full mt-auto">
                <h1 className="text-5xl font-semibold my-9 relative">
                  ${data?.price}
                  <Badge className="text-lg! px-5 font-semibold line-through absolute -top-5">
                    ${data?.discountPrice}
                  </Badge>
                </h1>
                <div className="flex gap-5 items-center px-5 py-9 h-17 border rounded-full">
                  <TooltipButton
                    icon={Plus}
                    title="Increment"
                    variant={"secondary"}
                    onClick={() => setQuantity((prev) => prev + 1)}
                  />
                  <Badge className="text-lg! font-semibold px-9 py-2.5">
                    {quantity}
                  </Badge>
                  <TooltipButton
                    icon={Minus}
                    title="Decrement"
                    variant={"secondary"}
                    onClick={() =>
                      setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                    }
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mt-5 w-full">
                <Link
                  href={`/checkout?id=${data?.id}&qty=${quantity}&subtotal=${data?.price * quantity}`}
                >
                  <Button size={"lg"}>
                    <DollarSign /> Buy Now
                  </Button>
                </Link>
                <div className="flex items-center gap-3">
                  <Badge className="text-lg! font-semibold px-9 py-1">
                    ${totalMoney}
                  </Badge>
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
                          price: data?.price,
                          quantity,
                        });
                        toast.success("Cart added.");
                      }}
                      icon={ShoppingBasket}
                      title="Add To Cart"
                      variant={"default"}
                    />
                  )}

                  <TooltipButton icon={Share2} title="Share" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="">
          <div className="border rounded-full px-5 py-3 flex items-center justify-center gap-3">
            <Button
              variant={tab === "overview" ? "default" : "secondary"}
              onClick={() => setTab("overview")}
            >
              <BriefcaseMedical /> Overview
            </Button>
            <Button
              variant={tab === "review" ? "default" : "secondary"}
              onClick={() => setTab("review")}
            >
              <UserStar />
              Review
            </Button>
          </div>
          {tab === "overview" ? (
            <OverviewComponent overview={data?.overview} />
          ) : (
            <ReviewComponent reviews={reviews} />
          )}
        </section>
      </div>
    </>
  );
}
