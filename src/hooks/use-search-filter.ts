"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const useQueryFilters = (searchKey: string = "query") => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Extract current values from URL
  const query = searchParams?.get(searchKey) || "";
  const categories = searchParams?.get("categories")?.split(",").filter(Boolean) || [];
  const status = searchParams?.get("status") || "all";

  // 2. Local state for the input typing (UI snappiness)
  const [localSearch, setLocalSearch] = useState(query);

  // Sync local search if URL changes (e.g. from a Reset button or Back button)
  useEffect(() => {
    setLocalSearch(query);
  }, [query]);

  // 3. The Core Navigation Function
  const updateUrl = useCallback((params: URLSearchParams) => {
    // Always reset page to 1 when any filter/search changes
    params.delete("page");

    const queryString = params.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;

    router.replace(url, { scroll: false });
  }, [pathname, router]);

  // 4. Action: Update Search (usually on Enter)
  const handleSearch = () => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    if (localSearch) params.set(searchKey, localSearch);
    else params.delete(searchKey);
    updateUrl(params);
  };

  // 5. Action: Update Single Select (for <Select /> components)
  const setSingleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    updateUrl(params);
  };

  // 6. Action: Toggle Multi-select (for Checkboxes)
  const toggleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    const currentValues = params.get(key)?.split(",").filter(Boolean) || [];
    
    const nextValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    if (nextValues.length > 0) {
      params.set(key, nextValues.join(","));
    } else {
      params.delete(key);
    }
    updateUrl(params);
  };

  // 7. Action: Clear all filters
  const clearFilters = () => {
    router.push(pathname);
    setLocalSearch("");
  };

  return {
    // States
    query,
    localSearch,
    categories,
    status,
    // Setters
    setLocalSearch,
    // Actions
    handleSearch,
    setSingleFilter,
    toggleFilter,
    clearFilters,
  };
};