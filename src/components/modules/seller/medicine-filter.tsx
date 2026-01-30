"use client";

import * as React from "react";
import { Check, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

// Filter Options
const categories = ["Tablet", "Capsule", "Syrup", "Injection", "Ointment"];
const statuses = ["In Stock", "Low Stock", "Out of Stock"];

export function MedicineFilters() {
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    [],
  );
  const [selectedStatus, setSelectedStatus] = React.useState<string[]>([]);

  const toggleFilter = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    value: string,
  ) => {
    setList((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value],
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2 w-full md:w-auto">
          <Filter className="size-4" />
          Filters
          {(selectedCategories.length > 0 || selectedStatus.length > 0) && (
            <span className="ml-1 rounded-full bg-primary px-1.5 py-0.5 text-[10px] text-primary-foreground">
              {selectedCategories.length + selectedStatus.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-sm rounded-xl" align="start">
        <div className="flex items-start gap-10">
          <div className="">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Category
            </p>
            <div className="space-y-1">
              {categories.map((cat) => (
                <div
                  key={cat}
                  onClick={() =>
                    toggleFilter(selectedCategories, setSelectedCategories, cat)
                  }
                  className="flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer hover:bg-muted rounded-sm"
                >
                  <div
                    className={cn(
                      "size-4 border rounded-sm flex items-center justify-center",
                      selectedCategories.includes(cat)
                        ? "bg-primary border-primary"
                        : "border-input",
                    )}
                  >
                    {selectedCategories.includes(cat) && (
                      <Check className="size-3 text-primary-foreground" />
                    )}
                  </div>
                  {cat}
                </div>
              ))}
            </div>
          </div>

          <div className="">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Availability
            </p>
            <div className="space-y-1">
              {statuses.map((status) => (
                <div
                  key={status}
                  onClick={() =>
                    toggleFilter(selectedStatus, setSelectedStatus, status)
                  }
                  className="flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer hover:bg-muted rounded-sm"
                >
                  <div
                    className={cn(
                      "size-4 border rounded-sm flex items-center justify-center",
                      selectedStatus.includes(status)
                        ? "bg-primary border-primary"
                        : "border-input",
                    )}
                  >
                    {selectedStatus.includes(status) && (
                      <Check className="size-3 text-primary-foreground" />
                    )}
                  </div>
                  {status}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-2 flex gap-2 mt-5">
          <Button
            variant="secondary"
            className="text-xs h-8 flex-1"
            onClick={() => {
              setSelectedCategories([]);
              setSelectedStatus([]);
            }}
          >
            <X />
            Clear
          </Button>
          <Button className="text-xs h-8 flex-1"><Check/> Apply</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
