"use client";

import React, { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  LayoutGrid,
  MoreVertical,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PaginationControl from "@/components/shared/pagination";
import CategoryCard from "@/components/shared/category-card";
import Link from "next/link";

const categoriesData = [
  {
    id: 1,
    name: "Antibiotics",
    medicineCount: 142,
    status: "Active",
    description: "Bacterial infection treatments",
  },
  {
    id: 2,
    name: "Pain Relief",
    medicineCount: 89,
    status: "Active",
    description: "Analgesics and anti-inflammatory drugs",
  },
  {
    id: 3,
    name: "Psychotropic",
    medicineCount: 45,
    status: "Restricted",
    description: "Controlled substances for mental health",
  },
  {
    id: 4,
    name: "Herbal",
    medicineCount: 30,
    status: "Active",
    description: "Natural and plant-based supplements",
  },
  {
    id: 5,
    name: "Skincare",
    medicineCount: 67,
    status: "Active",
    description: "Dermatological products and ointments",
  },
  {
    id: 6,
    name: "Vaccines",
    medicineCount: 12,
    status: "Active",
    description: "Immunization and biologicals",
  },
];

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Medicine Categories
          </h1>
          <p className="text-muted-foreground">
            Manage the global classification system for all listings.
          </p>
        </div>
        <Link href={'categories/create'}>
          <Button className="gap-2 bg-primary">
            <Plus className="size-4" /> Create Category
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <LayoutGrid className="size-4" />
          <span>Showing {categoriesData.length} Categories</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoriesData.map((category, idx) => (
          <CategoryCard key={idx} category={category} />
        ))}
      </div>
      <div className="mt-10">
        <PaginationControl
          currentPage={1}
          totalPages={6}
          options={{ size: "icon" }}
        />
      </div>
    </div>
  );
}
