"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";

import review from "../../../../../public/review.svg";
import vercel from "../../../../../public/vercel.svg";
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
  UserStar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TooltipButton } from "@/components/ui/tooltip-button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";
import ReviewComponent from "@/components/modules/shopPage/review";
import OverviewComponent from "@/components/modules/shopPage/overview";

export default function ShopDetails() {
  const price = 20.8;
  const [totalMoney, setTotalMoney] = useState<number>(price);
  const [quantity, setQuantity] = useState<number>(1);
  const [tab, setTab] = useState("overview");

  return (
    <>
      <div className="w-11/12 mx-auto flex flex-col gap-24">
        <section className="flex items-start gap-10 justify-between w-full h-full">
          <Card>
            <CardContent className="p-9">
              <Image src={vercel} alt="Picture" width={400} height={400} />
            </CardContent>
            <CardFooter className="flex items-center justify-center gap-3">
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
            </CardFooter>
          </Card>
          <div className="w-3/5 h-full flex flex-col items-start p-9">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center justify-between gap-2">
                <Badge className="text-sm px-3 py-1">New</Badge>
                <Badge variant={"outline"} className="text-sm px-3 py-1">
                  Out of Stock
                </Badge>
              </div>
              <Badge className="text-md font-semibold tracking-wider px-4 py-2 [&_svg]:size-4! flex items-center gap-1">
                <Timer /> 10:10:05
              </Badge>
            </div>
            <h1 className="text-3xl font-semibold mt-5">
              Natural-e Aloe Vera Gel – 200gram
            </h1>
            <div className="flex items-center gap-3 mt-3">
              <p className="text-md font-semibold text-muted-foreground">
                Product Owner -{" "}
              </p>
              <Badge
                className="text-md px-5 font-semibold"
                variant={"secondary"}
              >
                Jody Sign
              </Badge>
            </div>
            <p className="text-md font-normal tracking-wider mt-7">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Cupiditate eius error facilis placeat fugit aspernatur quisquam ex
              cum, quasi earum quod vitae expedita, dicta saepe libero nesciunt
              architecto dolorem recusandae? Eligendi officia, quasi cum ratione
              quos similique omnis excepturi suscipit recusandae ipsa id unde
              minus nemo nihil reprehenderit placeat asperiores quidem, facere
              accusamus. Dicta, tempore suscipit! Earum distinctio at pariatur
              maiores, aperiam illum. Eum distinctio reprehenderit iure, id
              soluta doloremque!
            </p>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-5xl font-semibold my-9 relative">
                $200.00{" "}
                <Badge className="text-lg! px-5 font-semibold line-through absolute -top-5">
                  $280
                </Badge>
              </h1>
              <div className="flex gap-5 items-center px-5 py-9 h-17 border rounded-full">
                <TooltipButton
                  icon={Plus}
                  title="Increment"
                  variant={"secondary"}
                  onClick={() => {
                    setQuantity(quantity + 1);
                    setTotalMoney(price * quantity);
                  }}
                />
                <Badge className="text-lg! font-semibold px-9 py-2.5">
                  {quantity}
                </Badge>
                <TooltipButton
                  icon={Minus}
                  title="Decrement"
                  variant={"secondary"}
                  onClick={() => {
                    setQuantity(quantity > 1 ? quantity - 1 : quantity);
                    setTotalMoney(price * quantity);
                  }}
                />
              </div>
            </div>
            <div className="flex items-center justify-between mt-5 w-full">
              <Button size={"lg"}>
                <DollarSign /> Buy Now
              </Button>
              <div className="flex items-center gap-3">
                <Badge className="text-lg! font-semibold px-9 py-1">
                  ${totalMoney}
                </Badge>
                <Button size={"lg"} variant={"secondary"}>
                  <ShoppingBasket /> Add To Cart
                </Button>

                <TooltipButton icon={Share2} title="Share" />
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
          {tab === "overview" ? <OverviewComponent /> : <ReviewComponent />}
        </section>
      </div>
    </>
  );
}
