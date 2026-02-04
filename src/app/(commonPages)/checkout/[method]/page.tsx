"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import cashImage from "../../../../../public/cash.svg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PackageOpen } from "lucide-react";
import Link from "next/link";
import CreateReviewOrder from "@/components/modules/review/create-review-dialog";

export default function MethodPage() {
  const pathname = usePathname().split("=")[1];
  const params = useSearchParams();

  const user = params.get("user");
  const address = params.get("address");
  const id = params.get("id");

  if (pathname !== "success") {
    return "";
  }
  return (
    <>
      <div>
        <Card className="w-full lg:w-11/12 lg:h-150 mx-auto">
          <CardContent className="h-full flex gap-19 flex-col-reverse lg:flex-row items-center justify-around">
            <div className="flex flex-col items-center w-fit">
              <Image
                src={cashImage}
                alt="Cash On Delivery"
                width={400}
                height={400}
              />
              <h3 className="text-3xl mx-auto my-5">Thank You for Parching.</h3>
              <Link href={"/orders"}>
                <Button>
                  <PackageOpen />
                  View Orders
                </Button>
              </Link>
            </div>
            <div className="flex flex-col gap-3 text-center">
              <h1 className="text-6xl font-normal leading-16">
                On The Way to <br />
                <span>
                  <b>Delivered</b>
                </span>{" "}
                <br />
                Your <i>Product</i>
              </h1>
              <div className="flex items-center gap-3 mx-auto">
                <Badge className="text-lg py-1 px-3 font-semibold">
                  {user}
                </Badge>
                <span className="text-2xl">at</span>
                <Badge
                  variant={"secondary"}
                  className="text-lg py-1 px-3 font-normal tracking-wide capitalize"
                >
                  {address}
                </Badge>
              </div>
              <p className="text-xl font-normal tracking-wide text-muted-foreground my-3">
                Please have the exact amount ready upon delivery.
              </p>
              <CreateReviewOrder id={id as string} />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
