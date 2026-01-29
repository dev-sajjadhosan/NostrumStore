"use client";

import AboutSection from "@/components/shared/aboutSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  BookOpenText,
  CircleArrowOutUpRight,
  Coffee,
  HeartPulse,
  LogIn,
  Pill,
  Rocket,
  Siren,
  Telescope,
  UserPlus2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const section = [
  {
    title: `We Are The Most Trusted
              <b >
                Pharmacy
              </b>
              On Online.`,
    badgeText: "Who We Are",
    badgeIcon: Pill,
    description: ` Phasellus eu duis parturient ut ipsum. Nibh natoque platea
              venenatis egestas vel litora neque.
              <br />
              <br />
              Ullamcorper magna euismod aliquam dui at mollis risus imperdiet
              ac. Lorem consequat egestas si hac venenatis pharetra per metus
              arcu sem. Sodales duis eget bibendum sapien imperdiet si conubia
              nullam. Morbi sollicitudin fermentum ornare pulvinar massa auctor
              sapien augue.`,
    image: {
      src: "about_1.svg",
      alt: "about section",
      width: 300,
      height: 300,
    },
  },
  {
    rlt: true,
    title: `Why we name it <b>Nostrum</b>?`,
    badgeText: "The Story Behind",
    badgeIcon: BookOpenText,
    description: ` In an era of mass-produced healthcare, we chose a name that reflects a
          personalized commitment to healing. Historically, an apothecary’s
          "Nostrum" was their signature remedy—a formula crafted with local
          expertise and individual care. We named our platform Nostrum to revive
          that sense of ownership and dedication in the digital pharmaceutical
          space.
          <br/>
          <br/>
          Derived from the Latin <i>"Mare Nostrum"</i>
          (Our Sea), the word
          <span className="font-medium text-foreground">Nostrum</span> literally
          translates to <span className="italic">"Ours."</span> In medicine, it
          signifies a proprietary prepared remedy. For us, it represents the
          bridge between ancient herbal wisdom and modern clinical science—a
          collection of trusted solutions that belong to our community.
          `,
    image: {
      src: "name_1.svg",
      alt: "name section",
      width: 350,
      height: 300,
    },
  },
];

const section2 = [
  {
    icon: Telescope,
    title: "Our Vision",
    description:
      "Consectetuer luctus ultricies cras cursus mi. Tempus dui cursus sollicitudin metus porta luctus.",
  },
  {
    rlt: true,
    icon: Rocket,
    title: "Our Mission",
    description:
      " Fermentum lacinia dictumst a sed mattis tortor habitasse posuere convallis. Donec posuere sed sodales finibus orci fames urna elit mus class ultricies.",
  },
];

export default function AboutPage() {
  const [isClick, setIsClick] = useState<number | null>(1);
  return (
    <>
      <div className="w-11/12 mx-auto flex flex-col gap-5">
        <Card className="lg:h-100">
          <CardContent className="h-full flex flex-col gap-10 lg:flex-row items-center justify-around">
            <Siren
              // size={200}
              strokeWidth={1}
              className="text-orange-700 animate-pulse size-48 lg:size-64"
            />
            <div className="flex flex-wrap lg:flex-col justify-center gap-5">
              <Link href={"/quick"}>
                <div className="flex relative">
                  <Badge className="absolute -right-5" variant={"default"}>
                    new
                  </Badge>
                  <Button className="h-18 w-45" variant={"secondary"}>
                    Quick
                    <CircleArrowOutUpRight />
                  </Button>
                </div>
              </Link>
              <Link href={"/login"}>
                <Button className="h-18 w-45" variant={"secondary"}>
                  Login <LogIn />
                </Button>
              </Link>
              <Link href={"/register"}>
                <Button className="h-18 w-45" variant={"secondary"}>
                  Sign Up <UserPlus2 />
                </Button>
              </Link>
            </div>
            <h1 className="text-8xl font-bold mb-4">About</h1>
          </CardContent>
        </Card>
        {section.map((sec, idx) => (
          <AboutSection
            key={idx}
            title={sec.title}
            rtl={sec.rlt}
            badgeText={sec.badgeText}
            badgeIcon={sec.badgeIcon}
            description={sec.description}
            image={{
              src: sec.image.src,
              alt: sec.image.alt,
              width: sec.image.width,
              height: sec.image.height,
            }}
          />
        ))}

        <div className="w-full flex flex-col lg:flex-row items-center gap-10 justify-around my-48">
          <div className="flex flex-col gap-3">
            <HeartPulse size={70} strokeWidth={1} />
            <h1 className="text-5xl">Your Health, Our Commitment</h1>
            <p className="text-lg"></p>
          </div>
          <div className="flex flex-col gap-5 items-center md:w-3xl">
            {section2.map((sec, idx) => (
              <Card key={idx} className="h-50">
                <CardContent
                  className={`h-full flex items-center justify-center gap-10 ${sec.rlt ? "flex-row-reverse" : ""}`}
                >
                  <sec.icon
                    size={100}
                    strokeWidth={1}
                    className="text-orange-700"
                  />
                  <Separator orientation="vertical" />
                  <div className="flex flex-col gap-2 w-3/4">
                    <h3 className="text-2xl font-medium">{sec.title}</h3>
                    <p
                      className="text-md text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: sec.description }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <h3 className="text-4xl font-semibold text-center">
          Meet Our Suppliers
        </h3>
        <div className="flex items-center gap-7 w-full overflow-scroll scroll-auto p-7">
          {Array.from({ length: 10 }).map((_, idx) => (
            <Card
              key={idx}
              className="w-xs h-40 shrink-0 cursor-pointer hover:scale-105 transition-all"
            >
              <CardContent className="h-full flex flex-col items-center justify-center text-4xl">
                <Image
                  src={"vercel.svg"}
                  alt="Suppliers"
                  width={40}
                  height={40}
                />
              </CardContent>
            </Card>
          ))}
        </div>
        <section className="flex flex-col gap-5 w-full mt-48">
          <h1 className="text-3xl font-medium text-center">
            Meet Our <b>Pharmacist</b>
          </h1>
          <div className="flex flex-col lg:flex-row items-center gap-5">
            <div className="flex flex-col gap-3">
              <Badge className="text-sm font-semibold!">
                Meet Our Pharmacist
              </Badge>
              <h1 className="text-4xl font-medium text-muted-foreground">
                Your Partner in <b className="text-primary">Health</b> and{" "}
                <i className="text-orange-700">Healing</i>
              </h1>
              <p className="text-md">
                Natoque fusce et orci molestie condimentum montes cras ex mauris
                finibus in. Odio iaculis sed nec maecenas lobortis arcu.
              </p>
            </div>
            <div className="flex items-center gap-3 lg:w-600 overflow-scroll p-5">
              {Array.from({ length: 3 }).map((_, idx) => (
                <Card
                  className={`h-90 lg:h-130 shrink-0 duration-75 hover:scale-105 hover:z-30 cursor-pointer ${isClick === idx ? "w-xs md:w-md lg:w-lg sticky z-20 blur-none" : "lg:w-50! not-hover:blur-xs text-center"}`}
                  key={idx}
                  onClick={() => setIsClick(idx)}
                >
                  <CardContent
                    className="h-full flex flex-col items-center justify-center text-4xl
              "
                  >
                    Person 0{idx}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
