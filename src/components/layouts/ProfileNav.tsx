import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Pill, Plus, ShoppingBasket, UserCircle2, Van } from "lucide-react";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { Button } from "../ui/button";
import { Roles } from "@/constants/roles";

const menus = [
  {
    name: "Profile",
    link: "/profile",
    icon: UserCircle2,
  },
  {
    name: "Cart",
    link: "/cart",
    icon: ShoppingBasket,
  },
  {
    name: "Orders",
    link: "/orders",
    icon: Van,
  },
];

export function ProfileView({ user }: { user: any }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="w-11 h-11 ml-3 cursor-pointer ring-2 ring-orange-700">
          <AvatarImage
            src={user.image || "https://github.com/shadcn.png"}
            alt="@shadcn"
            // className="grayscale"
          />
          <AvatarFallback>{user.name}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent
        className="w-lg p-8 mt-6 bg-accent/60 backdrop-blur-2xl rounded-xl space-y-5"
        side="bottom"
        align="end"
      >
        <div className="flex items-center gap-5">
          <Avatar className="w-20 h-20 ml-3 ring-2 ring-primary/20">
            <AvatarImage
              src={user.image || "https://github.com/shadcn.png"}
              alt={user.name}
              // className="grayscale"
            />
            <AvatarFallback>{user.name}</AvatarFallback>
            <AvatarBadge>
              <Plus />
            </AvatarBadge>
          </Avatar>
          <div className="flex flex-col text-left gap-1">
            <h1 className="text-xl font-semibold mt-2">{user.name}</h1>
            <Badge className="px-5 py-1 text-md font-semibold">
              {user.role}
            </Badge>
          </div>
        </div>
        <Separator />
        <ul className="grid grid-cols-2 gap-3">
          {menus.map((item, idx) => (
            <Link key={idx} href={item.link}>
              <Button className="w-full h-16">
                {<item.icon />} {item.name}
              </Button>
            </Link>
          ))}
          {user.role === Roles.CUSTOMER ? (
            ""
          ) : (
            <Link href={user.role === Roles.SELLER ? "/seller/dashboard" : "/admin"}>
              <Button className="w-full h-16">
                <Pill /> Dashboard
              </Button>
            </Link>
          )}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
