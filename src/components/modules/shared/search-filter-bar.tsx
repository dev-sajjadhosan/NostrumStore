"use client";

import { Check, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const categories = ["Tablet", "Capsule", "Syrup", "Injection", "Ointment"];
const statuses = ["In Stock", "Low Stock", "Out of Stock"];

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface SearchFilterProps {
  filter?: boolean;
}

export default function SearchFilterBar({ filter = true }: SearchFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("query") || "";

  const selectedCategories =
    searchParams.get("categories")?.split(",").filter(Boolean) || [];
  const selectedStatus =
    searchParams.get("status")?.split(",").filter(Boolean) || [];

  const [localSearch, setLocalSearch] = useState(query);
  const updateUrl = (searchTerm: string, cats: string[], stats: string[]) => {
    const params = new URLSearchParams(searchParams);

    if (searchTerm) params.set("search", searchTerm);
    else params.delete("search");

    if (cats.length > 0) params.set("categories", cats.join(","));
    else params.delete("categories");

    if (stats.length > 0) params.set("status", stats.join(","));
    else params.delete("status");

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    setLocalSearch(query);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateUrl(localSearch, selectedCategories, selectedStatus);
    }
  };

  const toggleCategory = (cat: string) => {
    const next = selectedCategories.includes(cat)
      ? selectedCategories.filter((i) => i !== cat)
      : [...selectedCategories, cat];
    updateUrl(query, next, selectedStatus);
  };

  const toggleStatus = (s: string) => {
    const next = selectedStatus.includes(s)
      ? selectedStatus.filter((i) => i !== s)
      : [...selectedStatus, s];
    updateUrl(query, selectedCategories, next);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center gap-5 py-2 w-full px-5">
        <div className="flex items-center gap-3 w-full rounded-xl bg-accent px-5">
          <Search className="size-6 text-muted-foreground" />
          <Input
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search by brand or generic name..."
            className="bg-transparent border-0! w-full"
          />
        </div>
        {filter && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary" className="gap-2 w-full md:w-40 h-13 rounded-xl">
                <Filter className="size-4" />
                Filters
                {(selectedCategories.length > 0 ||
                  selectedStatus.length > 0) && (
                  <span className="ml-1 rounded-full bg-primary px-1.5 py-0.5 text-[10px] text-primary-foreground">
                    {selectedCategories.length + selectedStatus.length}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-sm rounded-xl p-7" align="end">
              <div className="flex items-start gap-10">
                <div className="">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    Category
                  </p>
                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <div
                        key={cat}
                        onClick={() => toggleCategory(cat)}
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
                        onClick={() => toggleStatus(status)}
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
            </PopoverContent>
          </Popover>
        )}
      </div>
    </>
  );
}
