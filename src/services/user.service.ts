import { env } from "@/env";
import { cookies } from "next/headers";

const auth_url = env.AUTH_URL;

export const userService = {
  getSession: async function () {
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
  },
};
