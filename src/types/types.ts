import { LucideIcon } from "lucide-react";

export type MenuProps = {
  name: string;
  link: string;
  icon: LucideIcon | string;
};

export type PgOptions = {
  page: number;
  limit: number;
  pages: number;
  total: number;
};
