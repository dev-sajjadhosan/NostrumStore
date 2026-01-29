"use client";

import { usePathname } from "next/navigation";

export const useActivePath = () => {
  const pathname = usePathname();
  const isPath = (path: string, exact: boolean = true) => {
    return exact ? pathname === path : pathname.startsWith(path);
  };

  return isPath;
};
