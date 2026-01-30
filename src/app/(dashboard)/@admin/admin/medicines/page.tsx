"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  MoreVertical,
  ExternalLink,
  Ban,
  CheckCircle2,
  AlertTriangle,
  Download,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SearchFilterBar from "@/components/modules/shared/search-filter-bar";
import AdminMedicineFilter from "@/components/modules/admin/a-filter-control";
import PaginationControl from "@/components/shared/pagination";
import { useSearchParams } from "next/navigation";

const globalMedicines = [
  {
    id: "MED-101",
    name: "Napa Extend",
    category: "Pain Relief",
    vendor: "Lazz Pharma",
    price: 15.0,
    stock: 1200,
    status: "Active",
    type: "OTC",
  },
  {
    id: "MED-102",
    name: "Azithromycin 500mg",
    category: "Antibiotics",
    vendor: "Tamanna Pharmacy",
    price: 35.0,
    stock: 450,
    status: "Pending Review",
    type: "Prescription",
  },
  {
    id: "MED-103",
    name: "Xanax 0.5mg",
    category: "Psychotropic",
    vendor: "Model Medicine Corner",
    price: 120.0,
    stock: 85,
    status: "Flagged",
    type: "Controlled",
  },
];

export default function GlobalInventoryPage() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  useEffect(() => {
    if (categoryFromUrl) {
      setCategoryFilter(categoryFromUrl);
      console.log({ categoryFromUrl });
    }
  }, [categoryFromUrl]);
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Global Inventory
          </h1>
          <p className="text-muted-foreground italic">
            Manage all listed medicines across all vendors.
          </p>
        </div>
        <Button variant="outline" disabled>
          <Download className="mr-2 size-4" /> Export Master List
        </Button>
      </div>

      <Card className="border-0! bg-transparent!">
        <CardHeader className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <SearchFilterBar filter={false} />
            <AdminMedicineFilter />
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-25">ID</TableHead>
                <TableHead>Medicine Name</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price/Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {globalMedicines.map((item) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <TableCell className="font-mono text-xs font-bold">
                    {item.id}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold">{item.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {item.category}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{item.vendor}</span>
                      <ExternalLink className="size-3 text-muted-foreground cursor-pointer" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={item.type === "OTC" ? "secondary" : "outline"}
                      className="text-[10px]"
                    >
                      {item.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        ${item.price.toFixed(2)}
                      </span>
                      <span
                        className={`text-[10px] ${item.stock < 100 ? "text-red-500 font-bold" : "text-muted-foreground"}`}
                      >
                        {item.stock} in stock
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.status === "Active" && (
                      <div className="flex items-center gap-1 text-green-600 text-xs font-medium">
                        <CheckCircle2 className="size-3" /> Active
                      </div>
                    )}
                    {item.status === "Pending Review" && (
                      <div className="flex items-center gap-1 text-amber-600 text-xs font-medium">
                        <AlertTriangle className="size-3" /> Pending
                      </div>
                    )}
                    {item.status === "Flagged" && (
                      <div className="flex items-center gap-1 text-red-600 text-xs font-medium">
                        <Ban className="size-3" /> Flagged
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Product Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Product Page</DropdownMenuItem>
                        <DropdownMenuItem>
                          Edit Global Category
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-amber-600">
                          <AlertTriangle className="mr-2 size-4" /> Flag for
                          Review
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 font-semibold">
                          <Ban className="mr-2 size-4" /> Ban Product
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-10">
            <PaginationControl currentPage={1} totalPages={9} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
