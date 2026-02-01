"use server"

import { SellerServices } from "@/services/seller.service";
import { updateTag } from "next/cache";

export const createMedicine = async (data: any) => {
  const res = await SellerServices.createMedicine(data);
  // updateTag("medicines");
  return res;
};
