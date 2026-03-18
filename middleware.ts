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
const TOKEN_SALT =
  process.env.NODE_ENV === "production"
    ? "__Secure-authjs.session-token"
    : "authjs.session-token";

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;

  // 1️⃣ Get login status
  let isLoggedIn = false;
  try {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET!,
      salt: TOKEN_SALT,
    });
    isLoggedIn = !!token;
  } catch {
    isLoggedIn = false;
  }

  // 2️⃣ Route checks
  const isAuthAPIRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdminRoute = adminRoutes.includes(nextUrl.pathname);

  // 3️⃣ Role check (only if admin route)
  let isAdmin = false;
  if (isAdminRoute && isLoggedIn) {
    try {
      isAdmin = (await currentRole()) === "ADMIN";
    } catch {
      isAdmin = false;
    }
  }

  // 4️⃣ Allow API/auth routes to proceed
  if (isAuthAPIRoute) return NextResponse.next();

  // 5️⃣ Allow public routes
  if (isPublicRoute) return NextResponse.next();

  // 6️⃣ Redirect logged-in users away from auth pages
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(DefaultRedirectAfterLogin, req.url));
  }

  // 7️⃣ Redirect unauthenticated users to login (avoid loop)
  if (!isLoggedIn && !isPublicRoute && nextUrl.pathname !== "/auth/login") {
    const callBackUrl = encodeURIComponent(nextUrl.pathname + nextUrl.search);
    return NextResponse.redirect(
      new URL(`/auth/login?callbackURL=${callBackUrl}`, req.url)
    );
  }

  // 8️⃣ Admin routes protection
  if (isAdminRoute) {
    if (!isLoggedIn) return NextResponse.redirect(new URL("/auth/login", req.url));
    if (!isAdmin) return NextResponse.redirect(new URL("/", req.url));
  }

  // 9️⃣ Allow logged-in users to access private routes
  if (isLoggedIn && !isPublicRoute && !isAuthRoute) {
    return NextResponse.next();
  }

  // 🔟 Allow everything else
  return NextResponse.next();
}

//  🔧 Apply middleware to all pages except _next/static, _next/image, and favicon
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
