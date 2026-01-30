"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  ArrowUpDown,
  AlertCircle,
  Pill,
  CirclePile,
  PackageMinus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";
import { MedicineFilters } from "@/components/modules/seller/medicine-filter";
import { TooltipButton } from "@/components/ui/tooltip-button";
import PaginationControl from "@/components/shared/pagination";

// Mock Data
const initialMedicines = [
  {
    id: "1",
    name: "Napa Extend",
    generic: "Paracetamol",
    price: 15,
    stock: 120,
    category: "Tablet",
    status: "In Stock",
  },
  {
    id: "2",
    name: "Azithromycin",
    generic: "Antibiotic",
    price: 350,
    stock: 15,
    category: "Capsule",
    status: "Low Stock",
  },
  {
    id: "3",
    name: "Sergel 20",
    generic: "Esomeprazole",
    price: 70,
    stock: 0,
    category: "Capsule",
    status: "Out of Stock",
  },
  {
    id: "4",
    name: "Tofen 1mg",
    generic: "Ketotifen",
    price: 30,
    stock: 85,
    category: "Syrup",
    status: "In Stock",
  },
];

export default function SellerMedicinesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Medicine Inventory
          </h1>
          <p className="text-muted-foreground">
            Manage your product listings, stock levels, and pricing.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="size-4" /> Add Medicine
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-40">
        <Card className="">
          <CardContent className="h-full flex items-center justify-around">
            <Pill size={50} strokeWidth={1} />
            <Separator orientation="vertical" />
            <div className="flex flex-col items-center">
              <h1 className="text-2xl text-muted-foreground">Total Products</h1>
              <span className="text-2xl font-semibold ">48</span>
            </div>
          </CardContent>
        </Card>
        <Card className="">
          <CardContent className="h-full flex flex-row-reverse items-center justify-around">
            <PackageMinus size={50} strokeWidth={1} />
            <Separator orientation="vertical" />
            <div className="flex flex-col items-center">
              <h1 className="text-2xl text-muted-foreground">Low Stock</h1>
              <span className="text-2xl font-semibold ">05</span>
            </div>
          </CardContent>
        </Card>
        <Card className="">
          <CardContent className="h-full flex flex-row-reverse items-center justify-around">
            <CirclePile size={50} strokeWidth={1} />
            <Separator orientation="vertical" />
            <div className="flex flex-col items-center">
              <h1 className="text-2xl text-muted-foreground"> Out of Stock</h1>
              <span className="text-2xl font-semibold ">05</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search brand or generic name..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <MedicineFilters />
      </div>

      {/* Medicine Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1 cursor-pointer hover:text-foreground">
                    Stock <ArrowUpDown className="size-3" />
                  </div>
                </TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialMedicines.map((med) => (
                <TableRow key={med.id}>
                  <TableCell>
                    <div className="font-medium">{med.name}</div>
                    <div className="text-xs text-muted-foreground italic">
                      {med.generic}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="font-normal uppercase text-[10px]"
                    >
                      {med.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {med.stock}
                      {med.stock <= 15 && med.stock > 0 && (
                        <AlertCircle className="size-4 text-orange-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>${med.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        med.status === "In Stock"
                          ? "default"
                          : med.status === "Low Stock"
                            ? "secondary"
                            : "destructive"
                      }
                      className="whitespace-nowrap px-5 py-2 font-semibold  text-md"
                    >
                      {med.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-3">
                    <TooltipButton
                      icon={Edit}
                      title="Edit details"
                      size={"icon"}
                    />

                    <TooltipButton
                      icon={Plus}
                      title=" Add stock"
                      size={"icon"}
                    />
                    <TooltipButton
                      icon={Trash2}
                      title=" Delete medicine"
                      size={"icon"}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-9">

          <PaginationControl currentPage={1} totalPages={10} options={{size: 'icon'}} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
