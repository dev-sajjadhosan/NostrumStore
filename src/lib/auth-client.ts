import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: "http://localhost:5000"
//   baseURL: process.env.NEXT_PUBLIC_APP_URL,
});
