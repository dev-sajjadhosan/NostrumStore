
import React, { useState } from "react";

import SearchFilterBar from "@/components/modules/shared/search-filter-bar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminSearchFilter(){
  const [statusFilter, setStatusFilter] = useState("all");

 return (
  <>
   <div>
       <SearchFilterBar filter={false} />
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 h-9 rounded-full">
                <div className="flex items-center gap-2">
                  <Filter className="size-4" />
                  <SelectValue placeholder="Status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active Only</SelectItem>
                <SelectItem value="Suspended">Suspended</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            {statusFilter !== "all" && (
              <Button
                variant="secondary"
                size="icon"
                onClick={() => setStatusFilter("all")}
              >
                <X />
              </Button>
            )}
          </div>
   </div>
  </>
);
}
