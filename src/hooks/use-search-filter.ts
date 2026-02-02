"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const useQueryFilters = (searchKey: string = "query") => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams?.get(searchKey) || "";
  const categories = searchParams?.get("categories")?.split(",").filter(Boolean) || [];
  const status = searchParams?.get("status") || "all";

  const [localSearch, setLocalSearch] = useState(query);

  useEffect(() => {
    setLocalSearch(query);
  }, [query]);

  const updateUrl = useCallback((params: URLSearchParams) => {
    params.delete("page");

    const queryString = params.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;

    router.replace(url, { scroll: false });
  }, [pathname, router]);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    if (localSearch) params.set(searchKey, localSearch);
    else params.delete(searchKey);
    updateUrl(params);
  };

  const setSingleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    updateUrl(params);
  };

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

  return {
    
    query,
    localSearch,
    categories,
    status,
    
    setLocalSearch,
   
    handleSearch,
    setSingleFilter,
    toggleFilter,
  };
};