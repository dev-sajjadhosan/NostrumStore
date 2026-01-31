"use client";

import React, { useState } from "react";
import { 
  Store, 
  Search, 
  MoreHorizontal, 
  ExternalLink, 
  Star, 
  DollarSign, 
  AlertTriangle,
  MapPin,
  Filter
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock Vendor Data
const vendorsData = [
  {
    id: "VND-001",
    shopName: "Lazz Pharma",
    owner: "Lutfor Rahman",
    location: "Dhaka",
    totalSales: 45200.00,
    rating: 4.8,
    status: "Active",
    medicinesCount: 450
  },
  {
    id: "VND-002",
    shopName: "Tamanna Pharmacy",
    owner: "S.K. Biswas",
    location: "Chittagong",
    totalSales: 12800.50,
    rating: 3.2,
    status: "Warning",
    medicinesCount: 120
  },
];

export default function VendorsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Vendor Management</h1>
        <p className="text-muted-foreground italic">Manage partner pharmacies, monitor sales, and track performance.</p>
      </div>

      {/* Vendor Specific Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Total Vendors</p>
              <Store className="size-4 text-primary" />
            </div>
            <p className="text-2xl font-bold">42</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Pending Payouts</p>
              <DollarSign className="size-4 text-green-600" />
            </div>
            <p className="text-2xl font-bold">$8,240.00</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Flagged Shops</p>
              <AlertTriangle className="size-4 text-orange-500" />
            </div>
            <p className="text-2xl font-bold text-orange-600">03</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input placeholder="Search shop or owner..." className="pl-9" />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="size-4" /> Filter
        </Button>
      </div>

      <Card className="border-muted/40 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pharmacy / Store</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Total Sales</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendorsData.map((vendor) => (
              <TableRow key={vendor.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-bold">{vendor.shopName}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="size-3" /> {vendor.location} • {vendor.owner}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={vendor.status === "Active" ? "secondary" : "destructive"}>
                    {vendor.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">{vendor.medicinesCount} SKUs</TableCell>
                <TableCell className="font-medium">${vendor.totalSales.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Star className="size-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{vendor.rating}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon"><MoreHorizontal className="size-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Vendor Menu</DropdownMenuLabel>
                      <DropdownMenuItem className="gap-2"><ExternalLink className="size-4" /> Visit Storefront</DropdownMenuItem>
                      <DropdownMenuItem className="gap-2"><DollarSign className="size-4" /> View Ledger</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600 font-semibold">Suspend Shop</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}