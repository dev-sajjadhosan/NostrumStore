"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, ListFilter, RotateCwIcon, SortDesc } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HistoryFilter() {
  const [filterStatus, setFilterStatus] = React.useState("all");
  const [sortOrder, setSortOrder] = React.useState("newest");

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40 h-9 rounded-full text-xs md:text-sm">
            <ListFilter className="mr-2 size-4 text-muted-foreground" />
            <SelectValue placeholder="Filter Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="Delivered">Delivered</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
            <SelectItem value="Paid">Paid Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger className="w-40 h-9 rounded-full text-xs md:text-sm">
            <SortDesc className="mr-2 size-4 text-muted-foreground" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="highest">Highest Price</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {(filterStatus !== "all" || sortOrder !== "newest") && (
        <Button
          variant="secondary"
          size="icon"
          onClick={() => {
            setFilterStatus("all");
            setSortOrder("newest");
          }}
        >
          <RotateCwIcon />
        </Button>
      )}
    </div>
  );
}
