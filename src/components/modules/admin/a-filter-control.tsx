"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter, RotateCw, X } from "lucide-react";

export default function AdminMedicineFilter() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-37.5 h-9 rounded-full">
            <Filter className="mr-2 size-3.5 text-muted-foreground" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Pending Review">Pending Review</SelectItem>
            <SelectItem value="Flagged">Flagged</SelectItem>
            <SelectItem value="Banned">Banned</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-45 h-9 rounded-full">
            <Filter className="mr-2 size-3.5 text-muted-foreground" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Pain Relief">Pain Relief</SelectItem>
            <SelectItem value="Antibiotics">Antibiotics</SelectItem>
            <SelectItem value="Psychotropic">Psychotropic</SelectItem>
            <SelectItem value="Herbal">Herbal</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {(statusFilter !== "all" || categoryFilter !== "all") && (
        <Button
          variant="secondary"
          onClick={() => {
            setStatusFilter("all");
            setCategoryFilter("all");
          }}
          className="h-9 px-2 text-muted-foreground hover:text-destructive"
        >
          <RotateCw className="mr-2 size-4" />
        </Button>
      )}
    </div>
  );
}
