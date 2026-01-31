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

// Define the roles
type UserRole = "seller" | "admin";

const menuConfig = {
  seller: {
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
          { title: "Stock Alerts", url: "/seller/inventory/stock-alerts" },
        ],
      },
      {
        title: "Sales & Orders",
        url: "#",
        icon: ClipboardList,
        items: [
          { title: "Manage Orders", url: "/seller/orders" },
          { title: "Order History", url: "/seller/orders/history" },
        ],
      },
    ],
    projects: [
      { name: "My Shop", url: "/seller/shop-settings", icon: Store },
      { name: "Earnings", url: "/seller/payouts", icon: Wallet },
    ],
  },
  admin: {
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
      { name: "System Logs", url: "/admin/logs", icon: History },
      { name: "Global Settings", url: "/admin/settings", icon: Settings },
    ],
  },
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  role: UserRole; // Pass "seller" or "admin"
}

export function AppSidebar({ role, ...props }: AppSidebarProps) {
  const currentData = menuConfig[role];

  // Example user data (this would usually come from your auth hook)
  const userData = {
    name: role === "admin" ? "Platform Admin" : "Pharmacy Owner",
    email: role === "admin" ? "admin@nostrum.com" : "seller@pharmacy.com",
    avatar: "",
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex flex-row items-center gap-3 p-4">
        <Avatar className="w-10 h-10 border">
          <AvatarFallback>NS</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h1 className="text-md font-normal leading-none">Nostrum Store</h1>
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
            {role} Panel
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={currentData.navMain} />
        <NavProjects projects={currentData.projects} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
