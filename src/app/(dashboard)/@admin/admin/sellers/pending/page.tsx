"use client";

import React, { useState } from "react";
import {
  CheckCircle,
  XCircle,
  FileText,
  ExternalLink,
  Search,
  Clock,
  Store,
  MapPin,
  ShieldCheck,
} from "lucide-react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import ReviewApplication from "@/components/modules/admin/review-application";
import PaginationControl from "@/components/shared/pagination";

// Mock Data for Pending Sellers
const pendingSellers = [
  {
    id: "REQ-001",
    shopName: "Green Life Pharmacy",
    owner: "Dr. Ahmed Ullah",
    location: "Dhanmondi, Dhaka",
    licenseNo: "DGDA-12345678",
    appliedDate: "2026-01-28",
    status: "Pending",
  },
  {
    id: "REQ-002",
    shopName: "City Medicos",
    owner: "Sabbir Rahman",
    location: "Chittagong City",
    licenseNo: "DGDA-98765432",
    appliedDate: "2026-01-29",
    status: "Reviewing",
  },
];

export default function SellerApprovalsPage() {
  const [selectedSeller, setSelectedSeller] = useState<any>(null);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Seller Approvals
          </h1>
          <p className="text-muted-foreground italic">
            Review and verify pharmacy licenses to grant platform access.
          </p>
        </div>
        <Badge
          variant="outline"
          className="px-5 py-2 text-md font-semibold tracking-wide"
        >
          <Clock className="mr-2 size-5!" /> 3 Applications Pending
        </Badge>
      </div>

      <Card className="border-0! bg-transparent!">
        <CardHeader className="pb-3">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search by Shop Name or License..."
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Shop Details</TableHead>
                <TableHead>License No.</TableHead>
                <TableHead>Applied On</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingSellers.map((seller) => (
                <TableRow key={seller.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="bg-muted p-2 rounded-lg">
                        <Store className="size-4 text-primary" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm">
                          {seller.shopName}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="size-3" /> {seller.location}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {seller.licenseNo}
                  </TableCell>
                  <TableCell className="text-sm">
                    {seller.appliedDate}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        seller.status === "Reviewing" ? "secondary" : "outline"
                      }
                      className="animate-pulse text-md font-semibold px-5 py-1"
                    >
                      {seller.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <ReviewApplication
                      seller={seller}
                      setSelectedSeller={setSelectedSeller}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-10">
            <PaginationControl currentPage={1} totalPages={6}/>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
