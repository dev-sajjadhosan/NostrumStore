import { env } from "@/env";
import { cookies } from "next/headers";

const auth_url = env.AUTH_URL;
const api_url = env.API_URL;

const getSession = async () => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${auth_url}/get-session`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });
    const session = await res.json();

    if (session === null) {
      return { data: null, error: { message: "Session is missing!" } };
    }

    return { data: session, error: null };
  } catch (err) {
    return { data: null, error: { message: "Something Went Wrong!" } };
  }
};
const updateUserRole = async ({ role, data }: { role: string; data: any }) => {
  try {
    const cookieStore = await cookies();
    const roleData = {
      role,
    };
    const res = await fetch(`${api_url}/profile/role/${data?.user?.id}`, {
      method: "PATCH",
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roleData),
    });
    return await res.json();
  } catch (err) {
    return { data: null, error: { message: "Something Went Wrong!" } };
  }
};
const updateUser = async ({ data }: { role: string; data: any }) => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${api_url}/profile/me`, {
      method: "PATCH",
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    return { data: null, error: { message: "Something Went Wrong!" } };
  }
};
export const userService = {
  getSession,
  updateUserRole,
  updateUser
};
