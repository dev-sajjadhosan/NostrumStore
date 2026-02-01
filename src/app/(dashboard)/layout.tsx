import { AppSidebar } from "@/components/layouts/app-sidebar";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipButton } from "@/components/ui/tooltip-button";
import { Roles } from "@/constants/roles";
import { userService } from "@/services/user.service";
import { Grid2X2Plus, Hash, Plus } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default async function DashboardLayout({
  children,
  admin,
  seller,
}: {
  children: ReactNode;
  admin: ReactNode;
  seller: ReactNode;
}) {
  const { data } = await userService.getSession();
  const role = data?.user?.role;
  return (
    <>
      <SidebarProvider>
        <AppSidebar user={data} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b">
            <div className="flex items-center justify-between gap-2 px-3 w-full">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <div className="flex items-center gap-3">
                <Link href={"/dashboard/medicine/create"}>
                  <TooltipButton
                    icon={Plus}
                    title="Add Medicine"
                    variant={"secondary"}
                    size={"icon-sm"}
                  />
                </Link>
                <Link href={"/admin/categories/create"}>
                  <TooltipButton
                    icon={Grid2X2Plus}
                    title="Add Categories"
                    variant={"secondary"}
                    size={"icon-sm"}
                  />
                </Link>
              </div>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            {role === Roles.ADMIN ? admin : seller}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
