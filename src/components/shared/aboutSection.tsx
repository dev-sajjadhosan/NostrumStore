import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import React from "react";
import { Badge } from "../ui/badge";
import { LucideIcon } from "lucide-react";

interface AboutSectionProps {
  image: React.ComponentProps<typeof Image>;
  badgeText: string;
  badgeIcon?: LucideIcon;
  title: string;
  description: string;
  rtl?: boolean;
}

export default function AboutSection({
  image,
  title,
  badgeIcon: BadgeIcon,
  badgeText,
  description,
  rtl = false,
}: AboutSectionProps) {
  return (
    <div>
      <Card className="w-full lg:h-150 mt-48">
        <CardContent
          className={`h-full flex flex-col lg:flex-row items-center gap-18 justify-around px-15 ${rtl ? "flex-col-reverse lg:flex-row-reverse" : ""}`}
        >
          <Image {...image} />
          <Separator orientation="vertical" className="hidden lg:visible" />
          <Separator className="lg:hidden" />
          <div className="flex flex-col gap-2">
            <Badge className="text-md font-semibold px-4 [&_svg]:size-5! gap-2">
              {BadgeIcon && <BadgeIcon />} {badgeText}
            </Badge>
            <h1
              className="text-3xl md:text-5xl md:leading-12 mt-2"
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <p
              className="text-lg mt-4 tracking-wide text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
