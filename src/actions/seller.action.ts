"use server";

import { SellerServices } from "@/services/seller.service";
import { serviceOptions } from "@/types/types";
import { updateTag } from "next/cache";


export const getSellerMetadata = async (options?: serviceOptions) => {
  const res = await SellerServices.getSellerMetadata(options);
  return res;
};

export const createMedicine = async (data: any) => {
  const res = await SellerServices.createMedicine(data);
  return res;
};

export const updateOrderStauts = async (id: string, payload: any) => {
  const res = await SellerServices.updateOrderStauts(id, payload);
  updateTag("seller-orders");
  return res;
};
