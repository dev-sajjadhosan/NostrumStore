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



export interface StatItem {
  label: string;
  value: string;
  icon: LucideIcon;
}


export interface RoleData {
  badge: string;
  color: string;
  stats: StatItem[];
}

export interface RoleConfigMap {
  ADMIN: RoleData;
  SELLER: RoleData;
  CUSTOMER: RoleData;
}