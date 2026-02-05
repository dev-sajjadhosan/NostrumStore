// import { Roles } from "@/constants/roles";
// import { userService } from "@/services/user.service";
// import { NextRequest, NextResponse } from "next/server";

// const ADMIN_ROOT = "/admin";
// const SELLER_ROOT = "/seller";
// const AUTH_PAGES = ["/login", "/register", "/quick-up"];

// const PROTECTED_ROUTES = [
//   ADMIN_ROOT,
//   SELLER_ROOT,
//   "/dashboard",
//   "/cart",
//   "/profile",
//   "/orders",
//   "/checkout",
// ];

// export async function proxy(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const sessionToken = request.cookies.get("better-auth.session_token");
//   const { data } = await userService.getSession();
//   const user = data?.user;

//   if (!user) {
//     const isProtected = PROTECTED_ROUTES.some((route) =>
//       pathname.startsWith(route),
//     );
//     if (isProtected) {
//       const loginUrl = new URL("/login", request.url);
//       loginUrl.searchParams.set("callbackUrl", pathname);
//       return NextResponse.redirect(loginUrl);
//     }
//     return NextResponse.next();
//   }

//   if (AUTH_PAGES.some((page) => pathname.startsWith(page))) {
//     const redirectUrl =
//       user.role === Roles.ADMIN
//         ? ADMIN_ROOT
//         : user.role === Roles.SELLER
//           ? `${SELLER_ROOT}/dashboard`
//           : "/";
//     return NextResponse.redirect(new URL(redirectUrl, request.url));
//   }

//   const userRole = user.role as Roles;

//   if (
//     (pathname.startsWith(ADMIN_ROOT) || pathname.startsWith(SELLER_ROOT)) &&
//     userRole === Roles.CUSTOMER
//   ) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   if (
//     pathname.startsWith(ADMIN_ROOT) &&
//     userRole !== Roles.ADMIN &&
//     userRole !== Roles.SELLER
//   ) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/cart",
//     "/shop/:path*",
//     "/checkout",
//     "/checkout/:path*",
//     "/orders",
//     "/orders/:path*",
//     "/profile/:path*",
//     "/seller/:path*",
//     "/admin/:path*",
//     "/login",
//     "/register",
//   ],
// };

import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/verify")) {
    return NextResponse.next();
  }

  const sessionToken = request.cookies.get("better-auth.session_token");

  if (!sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart",
    "/checkout",
    "/checkout/:path*",
    "/orders",
    "/orders/:path*",
    "/profile/:path*",
    "/seller/:path*",
    "/admin/:path*",
  ],
};
