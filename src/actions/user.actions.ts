"use server";

import { AdminService } from "@/services/admin.service";
import { userService } from "@/services/user.service";
import { PgOptionsRs, serviceOptions } from "@/types/types";
import { updateTag } from "next/cache";
import { id } from "zod/v4/locales";
export async function updateUserRoleAction(role: string) {
  const { data } = await userService.getSession();

  if (!data?.user) {
    throw new Error("Unauthorized");
  }
  const res = await userService.updateUserRole({ role, data });

  return res;
}

export const getAllMedicines = async (
  params?: PgOptionsRs,
  options?: serviceOptions,
) => {
  const res = await userService.getAllMedicines(params, options);
  return res;
};

export const getProfile = async () => {
  const res = await userService.getProfile();
  return res;
};

export const getSingleMedicine = async (id: string) => {
  const res = await AdminService.singleMedicineData(id);
  return res;
};

export const createOrder = async (data: any) => {
  const res = await userService.createOrder(data);
  return res;
};

export const deleteOrder = async (id: string) => {
  const res = await userService.deleteOrder(id);
  updateTag("customer-orders");
  return res;
};
export const updateProfile = async (payload: any) => {
  const res = await userService.updateProfile(payload);
  updateTag("profile-update");
  return res;
};
