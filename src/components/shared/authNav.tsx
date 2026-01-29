"use client";

import { useActivePath } from "@/hooks/use-active-path";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { CircleArrowOutUpRight, LogIn, UserPlus2 } from "lucide-react";

export default function AuthNav() {
  const isPath = useActivePath();

  return (
    <>
      <div className="w-xs">
        <div className="flex flex-wrap lg:flex-col justify-center gap-5">
          <Link href={"/quick"}>
            <Button
              className="h-18 w-65"
              variant={isPath("/quick") ? "default" : "ghost"}
            >
              <Badge className="px-3 py-1 font-semibold" variant={"secondary"}>
                New
              </Badge>
              Quick
              <CircleArrowOutUpRight />
            </Button>
          </Link>
          <Link href={"/login"}>
            <Button
              className="h-18 w-65"
              variant={isPath("/login") ? "default" : "ghost"}
            >
              Login <LogIn />
            </Button>
          </Link>
          <Link href={"/register"}>
            <Button
              className="h-18 w-65"
              variant={isPath("/register") ? "default" : "ghost"}
            >
              Sign Up <UserPlus2 />
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
