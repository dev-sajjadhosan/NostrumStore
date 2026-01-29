import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Rating } from "@/components/ui/rating";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TooltipButton } from "@/components/ui/tooltip-button";
import {
  ChevronLeft,
  ChevronRight,
  DollarSign,
  ExternalLink,
  Newspaper,
  Share2,
  ShoppingBasket,
  Timer,
  TrafficCone,
} from "lucide-react";
import Image from "next/image";
import review from "../../../public/review.svg";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import NewsLetter from "@/components/shared/newsletter";
import ProductCard from "@/components/shared/productCard";
import PaginationControl from "@/components/shared/pagination";

export default function Home() {
  return (
    <>
      <div className="flex gap-2 w-11/12 h-full items-center mx-auto">
        <Card className="w-full h-150">
          <CardContent className="h-full flex items-center justify-center text-9xl">
            HERO
          </CardContent>
          <CardFooter>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, idx) => (
                <span
                  key={idx}
                  className="w-6 h-3.5 bg-neutral-700 rounded-xl"
                ></span>
              ))}
            </div>
          </CardFooter>
        </Card>
        <Card className="w-2xl h-150">
          <CardContent></CardContent>
        </Card>
      </div>
      <div className="flex flex-col gap-48 w-11/12 h-full mx-auto my-48">
        <section className="w-full text-center">
          <h1 className="text-3xl font-medium mb-10">Popular Categories</h1>
          <div className="grid grid-cols-4 gap-4 w-full">
            {Array.from({ length: 8 }).map((_, idx) => (
              <Card
                key={idx}
                className="h-40 cursor-pointer duration-75 hover:bg-accent/60"
              >
                <CardContent className="flex flex-col gap-2 items-center justify-center h-full">
                  <Image
                    src={"vercel.svg"}
                    width={40}
                    height={40}
                    alt="categories"
                  />
                  <h3 className="text-lg font-normal tracking-wider">
                    Categories
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
          <PaginationControl currentPage={1} totalPages={5} />
        </section>
        <section className="w-full">
          <div className="flex items-center justify-between mb-7">
            <h1 className="text-3xl font-medium">Popular Medicines</h1>
            <div className="flex items-center gap-3">
              <Select>
                <SelectTrigger className="w-45">
                  <SelectValue placeholder="SortBy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="dark">Low</SelectItem>
                  <SelectItem value="system">High</SelectItem>
                  <SelectItem value="system">Created</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-45">
                  <SelectValue placeholder="SortOrder" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">asc</SelectItem>
                  <SelectItem value="dark">desc</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-5 w-full">
            {Array.from({ length: 8 }).map((_, idx) => (
              <ProductCard key={idx} data={{}} />
            ))}
          </div>
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
        </section>
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
            <Card className="w-full h-150">
              <CardContent className="flex flex-col items-center justify-center h-full text-4xl">
                OFFER CARD 01
              </CardContent>
            </Card>
            <div className="flex flex-col w-5xl h-150 gap-3">
              <Card className="w-full h-full">
                <CardContent className="flex flex-col items-center justify-center h-full text-4xl">
                  OFFER CARD 02
                </CardContent>
              </Card>
              <Card className="w-full h-full">
                <CardContent className="flex flex-col items-center justify-center h-full text-4xl">
                  OFFER CARD 03
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
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
        <NewsLetter />a
      </div>
    </>
  );
}
