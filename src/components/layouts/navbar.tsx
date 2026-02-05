import Image from "next/image";
import { Button } from "../ui/button";
import {
  CircleArrowOutUpRight,
  Home,
  Info,
  MapPinned,
  PackageOpen,
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
import { userService } from "@/services/user.service";

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
  // {
  //   name: "Doctors",
  //   link: "/doctors",
  //   icon: Stethoscope,
  // },
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

export default async function Navbar() {
  const { data } = await userService.getSession();
  const user = data?.user || null;

  return (
    <div
      className={`sticky top-10 mx-auto my-8 flex  items-center justify-between w-11/12 h-18  border rounded-full bg-accent/40 z-50 ${user ? "pl-9 pr-4" : "px-3"}`}
    >
      <div className="flex items-center gap-3">
        <Image src={"vercel.svg"} alt="Nostrum Store" width={30} height={30} />
        <h1 className="text-xl font-extrabold hidden md:flex">Nostrum</h1>
      </div>
      <div className="">
        <NavigationMenu>
          <NavigationMenuList>
            {menuLinks.map((item: MenuProps) => (
              <NavigationMenuItem key={item.name}>
                <NavigationMenuLink asChild>
                  <Link href={item.link} className="capitalize">
                    {item.icon && <item.icon className="hidden md:flex" />}{" "}
                    {item.name}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex items-center gap-2">
        {user ? (
          <div className="flex items-center gap-2">
            {/* <TooltipButton icon={MapPinned} title="Location" /> */}
            {user?.role === "CUSTOMER" && (
              <div className="hidden md:flex">
                <Link href={"/cart"}>
                  <TooltipButton icon={ShoppingCart} title="Cart" />
                </Link>
                <Link href={"/orders"}>
                  <TooltipButton icon={PackageOpen} title="Orders" />
                </Link>
              </div>
            )}
            <ProfileView user={user} />
          </div>
        ) : (
          <Link href={"/login"}>
            <Button
              className="rounded-full text-xl font-semibold md:p-7 [&_svg]:size-6! md:[&_svg]:size-8! text-muted-foreground"
              size={"lg"}
              variant={"secondary"}
            >
              <span className="hidden md:flex">Log Up</span>
              <CircleArrowOutUpRight />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
