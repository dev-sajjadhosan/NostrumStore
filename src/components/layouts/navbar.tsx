import Image from "next/image";
import { Button } from "../ui/button";
import {
  CircleArrowOutUpRight,
  Home,
  Info,
  MapPinned,
  Phone,
  Pill,
  ShoppingCart,
  Stethoscope,
  Van,
} from "lucide-react";
import { ProfileView } from "./ProfileNav";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import Link from "next/link";
import { MenuProps } from "@/types/types";
import { TooltipButton } from "../ui/tooltip-button";

const menuLinks = [
  {
    name: "home",
    link: "/",
    icon: Home,
  },
  {
    name: "Shop",
    link: "/shop",
    icon: Pill,
  },
  {
    name: "Doctors",
    link: "/doctors",
    icon: Stethoscope,
  },
  {
    name: "contact",
    link: "/contact",
    icon: Phone,
  },
  {
    name: "about",
    link: "/about",
    icon: Info,
  },
];

export default function Navbar() {
  const user = [{ name: "John Doe" }];
  return (
    <div
      className={`sticky top-10 mx-auto my-8 flex  items-center justify-between w-11/12 h-18  border rounded-full bg-accent/40 z-50 ${user ? "pl-9 pr-4" : "px-3"}`}
    >
      <div className="flex items-center gap-3">
        <Image src={"vercel.svg"} alt="Nostrum Store" width={30} height={30} />
        <h1 className="text-xl font-extrabold">Nostrum</h1>
      </div>
      <NavigationMenu>
        <NavigationMenuList>
          {menuLinks.map((item: MenuProps) => (
            <NavigationMenuItem key={item.name}>
              <NavigationMenuLink asChild>
                <Link href={item.link} className="capitalize">
                  {item.icon && <item.icon />} {item.name}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex items-center gap-2">
        {user ? (
          <div className="flex items-center gap-2">
            <TooltipButton icon={MapPinned} title="Location" />
            <TooltipButton icon={ShoppingCart} title="Cart" />
            <TooltipButton icon={Van} title="Track Order" />
            <ProfileView />
          </div>
        ) : (
          <Button
            className="rounded-full text-xl font-semibold p-7 [&_svg]:size-8! text-muted-foreground"
            size={"lg"}
            variant={"secondary"}
          >
            Quick Up
            <CircleArrowOutUpRight />
          </Button>
        )}
      </div>
    </div>
  );
}
