import { BellRing, Github, Mailbox } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { Badge } from "../ui/badge";

export default function Footer() {
  const menuItems = [
    {
      title: "Product",
      links: [
        { text: "Overview", url: "#" },
        { text: "Pricing", url: "#" },
        { text: "Marketplace", url: "#" },
        { text: "Features", url: "#" },
        { text: "Integrations", url: "#" },
        { text: "Pricing", url: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About", url: "#" },
        { text: "Team", url: "#" },
        { text: "Blog", url: "#" },
        { text: "Careers", url: "#" },
        { text: "Contact", url: "#" },
        { text: "Privacy", url: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { text: "Help", url: "#" },
        { text: "Sales", url: "#" },
        { text: "Advertise", url: "#" },
      ],
    },
    {
      title: "Social",
      links: [
        { text: "Twitter", url: "#" },
        { text: "Instagram", url: "#" },
        { text: "LinkedIn", url: "#" },
      ],
    },
  ];
  return (
    <div className="flex flex-col items-center gap-7 w-11/12 mx-auto mt-48">
      <Card className="w-full h-96">
        <CardContent className="flex items-center justify-around h-full">
          <Mailbox size={180} strokeWidth={1} />
          <Separator orientation="vertical" />
          <div className="flex flex-col items-center gap-2 ">
            <h1 className="text-3xl">Subscribe to our newsletter</h1>
            <p className="text-md font-normal">
              Join our email subscription now to get updates on promotions and
              coupons.
            </p>
            <div className="flex items-center border rounded-full w-xl py-3 px-3 mt-7">
              <Input
                type="text"
                placeholder="name@example.com"
                className="border-0 bg-transparent! text-lg!"
              />
              <Button size={"lg"}>
                <BellRing />
                Subscribe
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <footer className="flex items-center justify-between mt-28 w-full">
        <aside className="flex flex-col gap-3">
          <Image src={"vercel.svg"} alt="nostrum" width={50} height={50} />
          <h1 className="text-2xl">Nostrum Store</h1>
          <p className="text-md w-9/12">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti
            dolorem asperiores nihil dolorum fugiat temporibus.
          </p>
          {/* <Separator/> */}
          <div className="flex items-center gap-3 mt-2">
            <Badge className="p-3 [&_svg]:size-6!" variant={'outline'}><Github/></Badge>
            <Badge className="p-3 [&_svg]:size-6!" variant={'outline'}><Github/></Badge>
            <Badge className="p-3 [&_svg]:size-6!" variant={'outline'}><Github/></Badge>
            <Badge className="p-3 [&_svg]:size-6!" variant={'outline'}><Github/></Badge>
          </div>
        </aside>
        <aside className="flex items-start gap-16">
          {menuItems.map((section, sectionIdx) => (
            <div key={sectionIdx}>
              <h3 className="mb-4 font-bold">{section.title}</h3>
              <ul className="space-y-4 text-muted-foreground">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx} className="font-medium hover:text-primary">
                    <a href={link.url}>{link.text}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>
      </footer>
      <h1 className="text-[13rem] mx-auto -mb-24">Nostrum Store</h1>
      <Separator />
      <p className="text-md tracking-wide mb-5">
        © 2024 Shadcnblocks.com. All rights reserved.
      </p>
    </div>
  );
}
