import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DefaultRedirectAfterLogin,
  adminRoutes,
} from "./constants/routes";
import { currentRole } from "./server-actions/use-current-role";

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;

  let isLoggedIn = false;
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    isLoggedIn = !!token;
  } catch (e) {
    isLoggedIn = false;
  }

  const isAuthAPIRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdminRoute = adminRoutes.includes(nextUrl.pathname);
  const isAdmin = isAdminRoute ? (await currentRole()) === "ADMIN" : false;

  if (isAuthAPIRoute) return NextResponse.next();

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(DefaultRedirectAfterLogin, req.url));
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callBackUrl = nextUrl.pathname + nextUrl.search;
    return NextResponse.redirect(
      new URL(`/auth/login?callbackURL=${encodeURIComponent(callBackUrl)}`, req.url)
    );
  }

  if (isAdminRoute) {
    if (!isLoggedIn) return NextResponse.redirect(new URL("/auth/login", req.url));
    if (!isAdmin) return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
