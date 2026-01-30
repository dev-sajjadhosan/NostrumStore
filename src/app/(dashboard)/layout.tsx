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
import { Hash, Plus } from "lucide-react";
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
  const userInfo = {
    role: "seller",
  };
  return (
    <>
      <SidebarProvider>
        <AppSidebar  role="admin"/>
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b">
            <div className="flex items-center justify-between gap-2 px-3 w-full">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <div className="flex items-center gap-3">
                <TooltipButton
                  icon={Plus}
                  title="Add Medicine"
                  variant={"secondary"}
                  size={"icon-sm"}
                />
                <TooltipButton
                  icon={Hash}
                  title="Add Medicine"
                  size={"icon-sm"}
                />
              </div>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">{admin}</div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
