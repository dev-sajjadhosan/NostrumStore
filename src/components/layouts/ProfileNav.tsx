import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { LayoutDashboard, Plus, PlusIcon } from "lucide-react";
import { Separator } from "../ui/separator";

export function ProfileView() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="w-12 h-12 ml-3 cursor-pointer ring-3 ring-primary/20">
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
            <p className="text-md font-semibold text-neutral-600">
              devsajjadhosan@gmail.com
            </p>
          </div>
        </div>
        <Separator />
        <ul className="grid grid-cols-2 gap-1">
          {[1, 2, 3, 4].map((item) => (
            <li className="border p-4 rounded-xl font-semibold cursor-pointer flex items-center gap-2 [&_svg]:size-5 hover:bg-accent">
              <LayoutDashboard /> Dashboard
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
