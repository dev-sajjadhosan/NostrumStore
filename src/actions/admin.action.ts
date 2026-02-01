"use server";

import { AdminService } from "@/services/admin.service";
import { updateTag } from "next/cache";

export const createCategory = async (data: any) => {
  const res = await AdminService.createCategory(data);
  updateTag("medicines");
  return res;
};

export const deleteCategory = async (id: string) => {
  const res = await AdminService.deleteCategory(id);
  updateTag("medicines");
  return res;
};
