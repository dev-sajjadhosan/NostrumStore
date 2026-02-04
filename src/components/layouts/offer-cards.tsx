import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { OfferImage } from "@/constants/home-images";
import { TooltipButton } from "../ui/tooltip-button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function OfferCards() {
  return (
    <>
      <section className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-medium">Our Offers</h1>
          <div className="flex gap-5 items-center justify-center mt-7">
            <TooltipButton
              icon={ChevronLeft}
              title="Prev"
              variant={"secondary"}
            />
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, idx) => (
                <span
                  key={idx}
                  className="w-7 h-3.5 bg-neutral-800 rounded-full"
                />
              ))}
            </div>
            <TooltipButton
              icon={ChevronRight}
              title="Next"
              variant={"secondary"}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Card className="w-full h-150 p-0 overflow-hidden">
            <CardContent className="flex flex-col items-center justify-center h-full text-4xl p-0">
              <Image
                src={OfferImage.offerb2}
                alt="Offer 01"
                className="object-fill w-full h-full"
              />
            </CardContent>
          </Card>
          <div className="flex flex-col w-5xl h-150 gap-3">
            <Card className="w-full h-full p-0 overflow-hidden">
              <CardContent className="flex flex-col items-center justify-center h-full text-4xl p-0">
                <Image
                  src={OfferImage.offera1}
                  alt="Offer 01"
                  className="object-fill w-full h-full"
                />
              </CardContent>
            </Card>
            <Card className="w-full h-full p-0 overflow-hidden">
              <CardContent className="flex flex-col items-center justify-center h-full text-4xl p-0 ">
                <Image
                  src={OfferImage.offerb2}
                  alt="Offer 01"
                  //
                  className="object-fill w-full h-full"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
