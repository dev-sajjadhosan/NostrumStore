import { Roles } from "@/constants/roles";
import { userService } from "@/services/user.service";
import { NextRequest, NextResponse } from "next/server";


const ADMIN_ROOT = "/admin";
const SELLER_ROOT = "/seller";
const AUTH_PAGES = ["/login", "/register"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { data } = await userService.getSession();
  console.log('proxy data', data);
  const user = data?.user;

  if (!user) {
  
    if (pathname.startsWith(ADMIN_ROOT) || pathname.startsWith(SELLER_ROOT) || pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  if (AUTH_PAGES.some(page => pathname.startsWith(page))) {
     const redirectUrl = user.role === Roles.ADMIN ? ADMIN_ROOT : (user.role === Roles.SELLER ? SELLER_ROOT : "/");
     return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  const userRole = user.role as Roles;


  if (pathname.startsWith(ADMIN_ROOT) && userRole !== Roles.ADMIN) {
    return NextResponse.redirect(new URL("/", request.url));
  }


  if (pathname.startsWith(SELLER_ROOT) && userRole !== Roles.SELLER) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart*",
    "/checkout/:path*",
    "/orders/:path*",
    "/profile/:path*",
    "/seller/:path*",
    "/admin/:path*",
    "/login",
    "/register",
  ],
};