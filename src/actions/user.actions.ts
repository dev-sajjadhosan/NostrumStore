"use server";

import { authClient } from "@/lib/auth-client";
import { userService } from "@/services/user.service";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export async function updateUserRoleAction(role: string) {
  const { data } = await userService.getSession();

  if (!data?.user) {
    throw new Error("Unauthorized");
  }
  const res = await userService.updateUserRole({ role, data });

  return res
}


