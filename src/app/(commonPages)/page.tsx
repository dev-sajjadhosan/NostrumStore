import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Rating } from "@/components/ui/rating";
import { TooltipButton } from "@/components/ui/tooltip-button";
import {
  ChevronLeft,
  ChevronRight,
  Newspaper,
  TrafficCone,
} from "lucide-react";
import Image from "next/image";
import review from "../../../public/review.svg";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import NewsLetter from "@/components/shared/newsletter";
import SectionCategories from "@/components/modules/customer/section-categories";
import SectionMedicines from "@/components/modules/customer/section-medicines";
import HeroBanner from "@/components/layouts/hero-banner";
import OfferCards from "@/components/layouts/offer-cards";

export default async function Home() {
  return (
    <>
      <HeroBanner />
      <div className="flex flex-col gap-48 w-11/12 h-full mx-auto my-48">
        <SectionCategories />
        <SectionMedicines />
        <OfferCards />
        <section className="flex flex-col gap-5">
          <h1 className="text-3xl font-semibold text-center">
            Customer Reviews
          </h1>
          <div className="">
            <Card className="w-full h-150">
              <CardContent className="h-full flex items-center justify-around text-3xl">
                <Image src={review} alt="Review" width={300} height={300} />
                <Separator orientation="vertical" />
                <div className="flex flex-col items-center w-2xl">
                  <div className="flex flex-col gap-3 items-center">
                    <Avatar className="w-18 h-18">
                      <AvatarFallback>US</AvatarFallback>
                    </Avatar>
                    <h1 className="text-xl font-semibold">Customer Name</h1>
                    <Rating rate={4.5} />
                    <p className="text-[15px] text-center tracking-wide">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ipsum, sapiente. Nobis laudantium architecto a animi quod
                      incidunt debitis, ea optio veniam adipisci quo vel rerum.
                    </p>
                  </div>
                  <div className="flex items-center gap-1 mt-16">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <span
                        key={idx}
                        className="w-7 h-3.5 bg-neutral-800 rounded-full"
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        <section className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-medium">Our Blogs & News</h1>
            <div className="flex items-center gap-3 border h-16 py-3 px-3 rounded-full">
              <Button size={"lg"}>
                News <Newspaper />
              </Button>
              <Separator orientation="vertical" />
              <Button size={"lg"} variant={"ghost"}>
                Blogs <TrafficCone />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-7 w-full overflow-scroll scroll-auto p-7">
            {Array.from({ length: 7 }).map((_, idx) => (
              <Card key={idx} className="w-xl h-150 shrink-0">
                <CardContent className="h-full flex flex-col items-center justify-center text-4xl">
                  {idx}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        <NewsLetter />
      </div>
    </>
  );
}
