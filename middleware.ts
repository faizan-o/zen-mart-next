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

// Ensure the secret is defined at runtime
if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("NEXTAUTH_SECRET environment variable is not defined!");
}

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;

  // 1️⃣ Check login status
  let isLoggedIn = false;
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET! });
    isLoggedIn = !!token;
  } catch (e) {
    isLoggedIn = false;
  }

  // 2️⃣ Route type checks
  const isAuthAPIRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdminRoute = adminRoutes.includes(nextUrl.pathname);

  // 3️⃣ Admin role check
  let isAdmin = false;
  if (isAdminRoute) {
    try {
      isAdmin = (await currentRole()) === "ADMIN";
    } catch (e) {
      isAdmin = false;
    }
  }

  // 4️⃣ API routes can pass through
  if (isAuthAPIRoute) return NextResponse.next();

  // 5️⃣ Redirect logged-in users away from auth pages
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(DefaultRedirectAfterLogin, req.url));
  }

  // 6️⃣ Redirect unauthenticated users to login for protected pages
  if (!isLoggedIn && !isPublicRoute) {
    const callBackUrl = encodeURIComponent(nextUrl.pathname + nextUrl.search);
    return NextResponse.redirect(new URL(`/auth/login?callbackURL=${callBackUrl}`, req.url));
  }

  // 7️⃣ Admin route protection
  if (isAdminRoute) {
    if (!isLoggedIn) return NextResponse.redirect(new URL("/auth/login", req.url));
    if (!isAdmin) return NextResponse.redirect(new URL("/", req.url));
  }

  // 8️⃣ Default: allow request
  return NextResponse.next();
}

// 9️⃣ Specify which routes the middleware applies to
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
