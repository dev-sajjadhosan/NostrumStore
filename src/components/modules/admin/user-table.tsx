"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { toast } from "sonner";
import { updateUserStatus } from "@/actions/admin.action";
import { genFallBackName } from "@/helpers/fallback-name";
import { Badge } from "@/components/ui/badge";
import { TooltipButton } from "@/components/ui/tooltip-button";
import {
  Ban,
  CircleSlash2,
  History,
  Mail,
  MoreHorizontal,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PaginationControl from "@/components/shared/pagination";

export default function UserTable({ data }: { data: any }) {
  const users = data?.data?.data;
  const pagination = data?.data?.pagination;

  const handleUserStatus = async (id: string, status: any) => {
    const toastID = toast.loading("Updating Status...");
    try {
      const res = await updateUserStatus(id, status);
      if (res.data) {
        toast.success("Status Updated.", { id: toastID });
      }
    } catch (err: any) {
      toast.error("Failed to Updating status. Try later!", { id: toastID });
    }
  };
  return (
    <>
      <div>
        <CardContent>
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                {/* <TableHead>Last Activity</TableHead> */}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.map((customer: any) => (
                <TableRow
                  key={customer.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9 border border-muted">
                        <AvatarImage src={customer.image} />
                        <AvatarFallback>
                          {genFallBackName(customer?.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm">
                          {customer.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {customer.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        customer.status === "Active"
                          ? "secondary"
                          : "destructive"
                      }
                      className="text-sm tracking-wider font-semibold px-5 py-1"
                    >
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-medium">
                    {customer.orders} orders
                  </TableCell>
                  <TableCell className="text-sm font-semibold">
                    ${customer?.totalSpent?.toFixed(2)}
                  </TableCell>
                  {/* <TableCell className="text-xs text-muted-foreground">
                    {customer?.lastOrder}
                  </TableCell> */}
                  <TableCell className="text-right space-x-3">
                    <TooltipButton
                      onClick={() =>
                        handleUserStatus(customer?.id, {
                          status:
                            customer?.status === "UNBAN" ? "BAN" : "UNBAN",
                        } as any)
                      }
                      title={
                        customer?.status === "UNBAN"
                          ? "Suspend Account"
                          : "Active Account"
                      }
                      icon={customer?.status === "UNBAN" ? Ban : CircleSlash2}
                      size={"icon"}
                    />
                    <TooltipButton
                      title="Order History"
                      icon={History}
                      size={"icon"}
                    />

                    {/* <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Customer Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Mail className="mr-2 size-4" /> Send Email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-amber-600">
                          <UserCheck className="mr-2 size-4" /> Reset Password
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-10">
            <PaginationControl
              currentPage={pagination?.page}
              totalPages={pagination?.pages}
              options={{ size: "icon" }}
            />
          </div>
        </CardContent>
      </div>
    </>
  );
}
