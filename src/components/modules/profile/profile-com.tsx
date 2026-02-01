"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  AtSign,
  Pill,
  ShoppingBag,
  Store,
  Users,
  Settings,
  CreditCard,
  Bell,
  ShieldCheck,
  ChevronRight,
  LogOut,
  Package,
  User,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import PMenuButton from "@/components/modules/profile/p-menu-button";
import ProfileDefault from "@/components/modules/profile/default";
import { useSearchParams } from "next/navigation";
import PersonalInformationView from "@/components/modules/profile/personal";
import PreferencesView from "@/components/modules/profile/preferences";
import DevelopmentCard from "@/components/shared/developement-card";
import InvalidCard from "@/components/shared/invalid-card";
import SecurityView from "@/components/modules/profile/security";

type UserRole = "ADMIN" | "SELLER" | "CUSTOMER";

export default function ProfileCom({ data }: { data: any }) {
  const path = useSearchParams().get("s");
  const role: UserRole = data?.user?.role;

  const roleConfig = {
    ADMIN: {
      badge: "Platform Admin",
      color: "text-red-600 bg-red-50 border-red-200",
      stats: [
        { label: "Total Users", value: "1.2k", icon: Users },
        { label: "Active Shops", value: "48", icon: Store },
        { label: "Approvals", value: "05", icon: ShieldCheck },
        { label: "Platform Rev", value: "$12k", icon: CreditCard },
      ],
    },
    SELLER: {
      badge: "Verified Seller",
      color: "border-accent",
      stats: [
        { label: "Products", value: "142", icon: Pill },
        { label: "Total Orders", value: "890", icon: Package },
        { label: "Revenue", value: "$4.5k", icon: CreditCard },
        { label: "Rating", value: "4.9", icon: ShoppingBag },
      ],
    },
    CUSTOMER: {
      badge: "Health Member",
      color: "text-accent-foreground bg-accent border-accent",
      stats: [
        { label: "Medicines", value: "098", icon: Pill },
        { label: "Orders", value: "12", icon: Package },
        { label: "Prescriptions", value: "04", icon: ShieldCheck },
        { label: "Points", value: "1250", icon: CreditCard },
      ],
    },
  }[role];

  return (
    <div className="w-full mx-auto overflow-hidden p-2">
      <AnimatePresence mode="wait">
        {path === null ? (
          <ProfileDefault roleConfig={roleConfig} data={data} />
        ) : (
          <motion.div
            key="subpage"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full h-full pt-10"
          >
            {path === "personal" ? (
              <PersonalInformationView data={data} />
            ) : path === "preferences" ? (
              <DevelopmentCard title="Preferences Page" progress={10} />
            ) : path === "notifications" ? (
              <DevelopmentCard title="Notifications Page" progress={10} />
            ) : path === "security" ? (
              // <DevelopmentCard title="Security Page" progress={10} />
              <SecurityView />
            ) : path === "billing" ? (
              <DevelopmentCard title="Billing Page" progress={10} />
            ) : (
              <InvalidCard />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
