"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertTriangle,
  ArrowUpRight,
  Search,
  PackageX,
  History,
  Filter,
  Pill,
  PackageSearch,
  Package,
} from "lucide-react";
import Link from "next/link";
import SearchFilterBar from "@/components/modules/shared/search-filter-bar";
import PaginationControl from "@/components/shared/pagination";
import { RestockModal } from "@/components/modules/seller/restock-dialog";

const stockAlerts = [
  {
    id: "1",
    name: "Napa Extend",
    genericName: "Paracetamol",
    stock: 5,
    unit: "Strip",
    price: "15.50",
    status: "Low Stock",
  },
  {
    id: "2",
    name: "Azithrocin",
    genericName: "Azithromycin",
    stock: 0,
    unit: "Box",
    price: "350.00",
    status: "Out of Stock",
  },
  {
    id: "3",
    name: "Sergel 20",
    genericName: "Esomeprazole",
    stock: 12,
    unit: "Strip",
    price: "70.00",
    status: "Low Stock",
  },
];

export default function StockAlertPage() {
  return (
    <div className="w-full mx-auto p-5 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Stock Alerts</h1>
          <p className="text-muted-foreground">
            Manage medicines that require immediate restocked.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <History className="mr-2 size-4" /> Restock History
          </Button>
          <Link href="/seller/medicines/create">
            <Button>
              {" "}
              <Pill /> Add New Batch
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="">
          <CardHeader className="">
            <CardTitle className="text-2xl font-medium text-muted-foreground">
              Out of Stock
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-row-reverse justify-between px-10">
            <PackageX size={60} strokeWidth={1} className="text-orange-700" />
            <div className="flex flex-col gap-1">
              <div className="text-4xl font-normal mb-2">08</div>
              <p className="text-sm text-muted-foreground">
                Requires urgent attention
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="">
          <CardHeader className="">
            <CardTitle className="text-2xl font-medium text-muted-foreground">
              Low Stock
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-row-reverse justify-between px-10">
            <PackageSearch
              size={60}
              strokeWidth={1}
              className="text-orange-700"
            />
            <div className="flex flex-col gap-1">
              <div className="text-4xl font-normal mb-2">15</div>
              <p className="text-sm text-muted-foreground">
                Below threshold (20 units)
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="">
          <CardHeader className="">
            <CardTitle className="text-2xl font-medium text-muted-foreground">
              Total SKUs
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-row-reverse justify-between px-10">
            <Package size={60} strokeWidth={1} className="text-orange-700" />
            <div className="flex flex-col gap-1">
              <div className="text-4xl font-normal mb-2">150</div>
              <p className="text-sm text-muted-foreground">
                Active medicines in shop
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0! bg-transparent!">
        <CardHeader className="p-4">
          <SearchFilterBar />
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medicine</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stockAlerts.map((item) => (
                <TableRow key={item.id} className="group">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {item.genericName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.stock === 0 ? (
                      <Badge
                        variant="destructive"
                        className="px-5 py-2 font-semibold text-md"
                      >
                        <PackageX className="size-4!" /> Out of Stock
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="px-5 py-2 font-semibold text-md"
                      >
                        <AlertTriangle className="size-4!" /> Low Stock
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`font-semibold ${item.stock === 0 ? "text-red-600" : "text-orange-600"}`}
                    >
                      {item.stock} {item.unit}s
                    </span>
                  </TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell>
                    <RestockModal item={item} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-11">
            <PaginationControl currentPage={1} totalPages={10} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
