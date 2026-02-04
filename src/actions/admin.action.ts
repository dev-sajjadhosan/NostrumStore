"use server";

import { AdminService } from "@/services/admin.service";
import { userService } from "@/services/user.service";
import { PgOptionsRs, serviceOptions } from "@/types/types";
import { updateTag } from "next/cache";

export const getAdminMetadata = async (options?: serviceOptions) => {
  const res = await AdminService.getAdminMetadata(options);
  return res;
};
export const getCategories = async (
  params?: PgOptionsRs,
  options?: serviceOptions,
) => {
  const res = await AdminService.getCategories(params, options);
  return res;
};

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

export const updateCategory = async (id: string, payload: any) => {
  const res = await AdminService.updateCategory(id, payload);
  updateTag("medicines");
  return res;
};

export const updateUserStatus = async (id: string, payload: string) => {
  const res = await AdminService.updateUserStatus(id, payload);
  updateTag("users");
  return res;
};

export const singleMedicineData = async (id: string) => {
  const res = await AdminService.singleMedicineData(id);
  return res;
};

export const updateMedicineData = async (id: string, payload: any) => {
  const res = await AdminService.updateMedicineData(id, payload);
  updateTag("medicines");
  return res;
};

export const updateMedicineStock = async (id: string, payload: any) => {
  const res = await AdminService.updateMedicineStock(id, payload);
  updateTag("medicines");
  return res;
};

export const deleteMedicine = async (id: string) => {
  const res = await AdminService.deleteMedicine(id);
  updateTag("medicines");
  return res;
};

export const singleOrderData = async (id: string) => {
  const res = await userService.singleOrderData(id);
  return res;
};
