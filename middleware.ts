// middleware.ts
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

// Ensure NEXTAUTH_SECRET is defined
if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("NEXTAUTH_SECRET must be set");
}

// Use known session cookie/salt name for Auth.js
const TOKEN_SALT = process.env.NODE_ENV === "production"
  ? "__Secure-authjs.session-token"
  : "authjs.session-token";

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;

  // Check login status
  let isLoggedIn = false;
  try {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET!,
      salt: TOKEN_SALT,
    });
    isLoggedIn = !!token;
  } catch (e) {
    isLoggedIn = false;
  }

  // Routing flags
  const isAuthAPIRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdminRoute = adminRoutes.includes(nextUrl.pathname);

  // Role check (only if admin route)
  let isAdmin = false;
  if (isAdminRoute && isLoggedIn) {
    try {
      isAdmin = (await currentRole()) === "ADMIN";
    } catch {
      isAdmin = false;
    }
  }

  // Allow API/auth prefix
  if (isAuthAPIRoute) return NextResponse.next();

  // Redirect logged in users away from auth pages
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(DefaultRedirectAfterLogin, req.url));
  }

  // Redirect unauthenticated to login
  if (!isLoggedIn && !isPublicRoute) {
    const callBackUrl = encodeURIComponent(nextUrl.pathname + nextUrl.search);
    return NextResponse.redirect(
      new URL(`/auth/login?callbackURL=${callBackUrl}`, req.url),
    );
  }

  // Admin routes protection
  if (isAdminRoute) {
    if (!isLoggedIn) return NextResponse.redirect(new URL("/auth/login", req.url));
    if (!isAdmin) return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
