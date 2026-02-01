"use server";

import { userService } from "@/services/user.service";
import { redirect } from "next/navigation";

export async function updateUserRoleAction(role: string) {
  const { data } = await userService.getSession();

  if (!data?.user) {
    throw new Error("Unauthorized");
  }
  const res = await userService.updateUserRole({ role, data });

  return res
}
