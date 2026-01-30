"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import cashImage from "../../../../../public/cash.svg";

export default function MethodPage() {
  const pathname = usePathname().split("=")[1];

  return (
    <>
      <div>
        <Card className="w-11/12 h-150 mx-auto">
          <CardContent className="h-full flex gap-9 items-center justify-around">
            <Image
              src={cashImage}
              alt="Cash On Delivery"
              width={400}
              height={400}
            />
            <Separator orientation="vertical" />
            <div className="flex flex-col gap-3 text-center">
              <h1 className="text-6xl font-normal leading-16">
                On The Way to <br />
                <span>
                  <b>Delivered</b>
                </span>{" "}
                <br />
                Your <i>Product</i>
              </h1>
              <p className="text-xl font-normal tracking-wide text-muted-foreground">
                Please have the exact amount ready upon delivery.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
