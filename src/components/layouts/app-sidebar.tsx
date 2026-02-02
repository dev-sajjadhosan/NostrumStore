"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Pill,
  ClipboardList,
  Users,
  Settings,
  Store,
  Wallet,
  ShieldCheck,
  History,
  Van,
  Layers2,
  Home,
  User2,
} from "lucide-react";

import { NavMain } from "@/components/layouts/nav-main";
import { NavProjects } from "@/components/layouts/nav-projects";
import { NavUser } from "@/components/layouts/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Roles } from "@/constants/roles";

const menuConfig = {
  SELLER: {
    navMain: [
      {
        title: "General",
        url: "#",
        icon: Layers2,
        isActive: true,
        items: [
          {
            title: "Dashboard",
            url: "/seller/dashboard",
            // icon: LayoutDashboard,
          },
        ],
      },

      {
        title: "Inventory",
        url: "#",
        icon: Pill,
        isActive: true,
        items: [
          { title: "All Medicines", url: "/seller/medicines" },
          { title: "Add New Medicine", url: "/seller/medicines/create" },
          // { title: "Stock Alerts", url: "/seller/inventory/stock-alerts" },
        ],
      },
      {
        title: "Sales & Orders",
        url: "#",
        icon: ClipboardList,
        items: [
          { title: "Manage Orders", url: "/seller/orders" },
          // { title: "Order History", url: "/seller/orders/history" },
        ],
      },
    ],
    projects: [
      // { name: "My Shop", url: "/seller/shop-settings", icon: Store },
      // { name: "Earnings", url: "/seller/payouts", icon: Wallet },
      { name: "Home", url: "/", icon: Home },
      { name: "All Medicines", url: "/shop", icon: Pill },
    ],
  },
  ADMIN: {
    navMain: [
      {
        title: "General",
        url: "#",
        icon: Layers2,
        isActive: true,
        items: [{ title: "Dashboard", url: "/admin" }],
      },
      {
        title: "Platform Control",
        url: "#",
        icon: ShieldCheck,
        isActive: true,
        items: [
          // { title: "Global Inventory", url: "/admin/medicines" },
          { title: "Categories", url: "/admin/categories" },
          { title: "Create Category", url: "/admin/categories/create" },
          // { title: "Seller Approvals", url: "/admin/sellers/pending" },
        ],
      },
      {
        title: "User Management",
        url: "#",
        icon: Users,
        items: [
          { title: "All Users", url: "/admin/users" },
          // { title: "All Vendors", url: "/admin/users/vendors" },
        ],
      },
      {
        title: "Orders Management",
        url: "#",
        icon: Van,
        items: [{ title: "All Orders", url: "/admin/orders" }],
      },
    ],
    projects: [
      // { name: "System Logs", url: "/admin/logs", icon: History },
      // { name: "Global Settings", url: "/admin/settings", icon: Settings },
      { name: "Home", url: "/", icon: Home, option: false },
      { name: "All Medicines", url: "/shop", icon: Pill, option: false },
    ],
  },
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: any;
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const currentData = menuConfig[user?.user?.role as keyof typeof menuConfig];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex flex-row items-center gap-3 p-4">
        <Avatar className="w-10 h-10 border">
          <AvatarFallback>NS</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h1 className="text-md font-normal leading-none">Nostrum Store</h1>
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
            {user?.user?.role} Panel
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={currentData?.navMain} />
        <NavProjects projects={currentData?.projects} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user?.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
