"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RoleData } from "@/types/types";
import { motion } from "framer-motion";
import {
  AtSign,
  Bell,
  CreditCard,
  Edit2,
  Home,
  LayoutDashboard,
  LayoutDashboardIcon,
  LogOut,
  Settings,
  ShieldCheck,
  User,
} from "lucide-react";
import PMenuButton from "./p-menu-button";
import { useRouter, useSearchParams } from "next/navigation";
import { TooltipButton } from "@/components/ui/tooltip-button";
import Link from "next/link";
export default function ProfileDefault({
  roleConfig,
  data,
}: {
  roleConfig: RoleData;
  data: any;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const user = data?.user;

  const handleProfileRoute = (path: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("s", path);

    router.push(`?${params.toString()}`, { scroll: false });
  };
  return (
    <>
      <motion.div
        key="dashboard"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="space-y-5 w-11/12 mx-auto"
      >
        <div className="flex flex-col items-center text-center space-y-4 pt-10 pb-6 border-b">
          <div className="relative">
            <Avatar className="w-40 h-40 border-4 border-background shadow-xl">
              <AvatarImage
                src={user?.image || "https://github.com/shadcn.png"}
              />
              <AvatarFallback>{user?.name}</AvatarFallback>
            </Avatar>
            <Badge
              variant={"default"}
              className={`absolute bottom-0 right-0 px-3 py-1 shadow-accent ${roleConfig.color}`}
            >
              {roleConfig.badge}
            </Badge>
          </div>

          <div className="flex flex-col items-center w-full">
            <h1 className="text-3xl font-bold tracking-tight">{user?.name}</h1>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <AtSign className="size-4" />
              <p className="text-lg">{user?.email}</p>
            </div>
          </div>
          <div className="flex justify-end w-full">
            <div className="flex items-start gap-5">
              {user?.role === "SELLER" ? (
                <Link href={"/seller/dashboard"}>
                  <TooltipButton icon={LayoutDashboard} title="Go Dashboard" />
                </Link>
              ) : user?.role === "ADMIN" ? (
                <Link href={"/admin"}>
                  <TooltipButton icon={LayoutDashboard} title="Go Dashboard" />
                </Link>
              ) : (
                ""
              )}
              {/* <TooltipButton
                icon={Edit2}
                title="Profile Edit"
                variant={"secondary"}
                onClick={() => router.push("/profile")}
              /> */}
              <TooltipButton
                icon={Home}
                title="Go Home"
                onClick={() => router.push("/")}
              />
            </div>
          </div>
        </div>

        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {roleConfig.stats.map((stat, i) => (
            <Card
              key={i}
              className="border-muted/40 shadow-sm hover:border-primary/50 transition-all"
            >
              <CardContent className="flex items-center justify-between gap-2">
                <div className="p-3 bg-muted rounded-full">
                  <stat.icon className="size-7 text-primary" />
                </div>
                <div className="flex flex-col gap-1 text-right">
                  <p className="text-3xl font-semibold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider italic">
                    {stat.label}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div> */}

        <div className="flex flex-col lg:flex-row items-center gap-8 pt-4 h-full">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg px-2">Account Settings</h3>
            <div className="space-y-1">
              <PMenuButton
                icon={User}
                label="Personal Information"
                onClick={() => handleProfileRoute("personal")}
              />
              <PMenuButton
                icon={Settings}
                label="Preferences"
                onClick={() => handleProfileRoute("preferences")}
              />
              <PMenuButton
                icon={Bell}
                label="Notifications"
                onClick={() => handleProfileRoute("notifications")}
              />
            </div>
          </div>
          <Separator orientation="vertical" className="h-43! hidden lg:flex" />
          <div className="space-y-4">
            <h3 className="font-semibold text-lg px-2">Privacy & Support</h3>
            <div className="space-y-1">
              <PMenuButton
                icon={ShieldCheck}
                label="Security & Password"
                onClick={() => handleProfileRoute("security")}
              />
              <PMenuButton
                icon={CreditCard}
                label="Billing Details"
                onClick={() => handleProfileRoute("billing")}
              />
              <Button
                variant="ghost"
                onClick={() => router.push("/logout")}
                className="w-full justify-between h-12 text-destructive hover:text-destructive hover:bg-destructive/5 px-4"
              >
                <div className="flex items-center gap-3">
                  <LogOut className="size-5" />
                  <span className="font-medium">Logout</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
