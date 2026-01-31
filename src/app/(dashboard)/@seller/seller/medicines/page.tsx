"use client";

import { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  ArrowUpDown,
  AlertCircle,
  Pill,
  CirclePile,
  PackageMinus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Separator } from "@/components/ui/separator";
import { TooltipButton } from "@/components/ui/tooltip-button";
import PaginationControl from "@/components/shared/pagination";
import SearchFilterBar from "@/components/modules/shared/search-filter-bar";
import Link from "next/link";

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
    <div className="p-3 lg:p-5 flex flex-col gap-9">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Medicine Inventory
          </h1>
          <p className="text-muted-foreground">
            Manage your product listings, stock levels, and pricing.
          </p>
        </div>
        <Link href={"/seller/medicines/create"}>
          <Button className="gap-2">
            <Plus className="size-4" /> Add Medicine
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:h-40">
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

      <SearchFilterBar />

      <Card className="bg-transparent border-0">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-62.5">Product</TableHead>
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
            <PaginationControl
              currentPage={1}
              totalPages={10}
              options={{ size: "icon" }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
