"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  LogOut,
  Pill,
  Plus,
  ShoppingBasket,
  UserCircle2,
  Van,
} from "lucide-react";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { Button } from "../ui/button";
import { Roles } from "@/constants/roles";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { genFallBackName } from "@/helpers/fallback-name";

const menus = [
  {
    name: "Profile",
    link: "/profile",
    icon: UserCircle2,
    access: false,
  },
  {
    name: "Cart",
    link: "/cart",
    icon: ShoppingBasket,
    access: "CUSTOMER",
  },
  {
    name: "Orders",
    link: "/orders",
    icon: Van,
    access: "CUSTOMER",
  },
];

export function ProfileView({ user }: { user: any }) {
  const handleLogout = async () => {
    const toastID = toast.loading("Logging out...");
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged out successfully", { id: toastID });
            window.location.href = "/";
          },
        },
      });
    } catch (err) {
      toast.error("Logout failed!", { id: toastID });
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="w-11 h-11 lg:ml-3 cursor-pointer">
          <AvatarImage
            src={user?.image || "https://github.com/shadcn.png"}
            alt="@shadcn"
            className="object-cover"
            // className="grayscale"
          />
          <AvatarFallback>{genFallBackName(user?.name)}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent
        className="w-113 md:w-lg p-13 mt-6 bg-neutral-900 border-0 rounded-xl space-y-5"
        side="bottom"
        align="end"
      >
        <div className="flex flex-col items-center gap-5">
          <Avatar className="w-40 h-40 ml-3">
            <AvatarImage
              src={user?.image || "https://github.com/shadcn.png"}
              alt={user?.name}
              className="object-cover"
            />
            <AvatarFallback>{genFallBackName(user?.name)}</AvatarFallback>
            <AvatarBadge>
              <Plus />
            </AvatarBadge>
          </Avatar>
          <div className="flex flex-col items-center gap-1">
            <h1 className="text-xl font-semibold mt-2">{user?.name}</h1>
            <Badge className="px-5 py-1 text-md font-semibold">
              {user?.role}
            </Badge>
          </div>
        </div>
        <Separator />
        <ul className="grid grid-cols-2 gap-3">
          <Link href={"/profile"}>
            <Button className="w-full h-13">
              <UserCircle2 /> Profile
            </Button>
          </Link>
          {user?.role === "CUSTOMER" && (
            <>
              <Link href={"/cart"}>
                <Button className="w-full h-13">
                  <ShoppingBasket /> My Cart
                </Button>
              </Link>
              <Link href={"/orders"}>
                <Button className="w-full h-13">
                  <Van /> Orders
                </Button>
              </Link>
            </>
          )}

          {user.role === Roles.CUSTOMER ? (
            ""
          ) : (
            <Link
              href={user?.role === Roles.SELLER ? "/seller/dashboard" : "/admin"}
            >
              <Button className="w-full h-13">
                <Pill /> Dashboard
              </Button>
            </Link>
          )}
        </ul>
        <Separator />
        <div className="flex gap-5">
          <Button
            onClick={handleLogout}
            className="w-full text-orange-800"
            size={"lg"}
          >
            Logout <LogOut />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
