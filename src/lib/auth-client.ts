import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: "http://localhost:5000"
  // baseURL: process.env.BASE_URL,
});
