import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Pill, Plus, ShoppingBasket, UserCircle2, Van } from "lucide-react";
import { Separator } from "../ui/separator";

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
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: Pill,
  },
];

export function ProfileView() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="w-11 h-11 ml-3 cursor-pointer ring-2 ring-orange-700">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            // className="grayscale"
          />
          <AvatarFallback>CN</AvatarFallback>
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
              src="https://github.com/shadcn.png"
              alt="@shadcn"
              // className="grayscale"
            />
            <AvatarFallback>CN</AvatarFallback>
            <AvatarBadge>
              <Plus />
            </AvatarBadge>
          </Avatar>
          <div className="flex flex-col text-left gap-1">
            <h1 className="text-xl font-semibold mt-2">
              Mohammad Sajjad Hosan
            </h1>
            <Badge className="px-5 py-1 text-md font-semibold">Customer</Badge>
          </div>
        </div>
        <Separator />
        <ul className="grid grid-cols-2 gap-1">
          {menus.map((item) => (
            <li className="border p-4 rounded-xl font-semibold cursor-pointer flex items-center gap-2 [&_svg]:size-5 hover:bg-accent">
              {<item.icon />} {item.name}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
