import { Roles } from "@/constants/roles";
import { userService } from "@/services/user.service";
import { NextRequest, NextResponse } from "next/server";

const VERIFY_PAGE = "register/verify";
const ADMIN_ROOT = "/admin";
const SELLER_ROOT = "/seller";
const AUTH_PAGES = ["/login", "/register", "/quick-up", "/auth/roles"];
const PROTECTED_ROUTES = [
  ADMIN_ROOT,
  SELLER_ROOT,
  "/dashboard",
  "/cart",
  "/profile",
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { data } = await userService.getSession();
  const user = data?.user;

  if (!user) {
    const isProtected = PROTECTED_ROUTES.some((route) =>
      pathname.startsWith(route),
    );

    if (isProtected) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  if (user && !user.isEmailVerified && pathname !== VERIFY_PAGE) {
  
    return NextResponse.redirect(new URL(VERIFY_PAGE, request.url));
  }
  

  if (user && user.isEmailVerified && pathname === VERIFY_PAGE) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (AUTH_PAGES.some((page) => pathname.startsWith(page))) {
    const redirectUrl =
      user.role === Roles.ADMIN
        ? ADMIN_ROOT
        : user.role === Roles.SELLER
          ? SELLER_ROOT
          : "/";
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
    "/cart",
    "/shop/:path*",
    "/checkout",
    "/checkout/:path*",
    "/orders/:path*",
    "/profile/:path*",
    "/seller/:path*",
    "/admin/:path*",
    "/login",
    // "/quick-up/:path*",
    "/register",
  ],
};
