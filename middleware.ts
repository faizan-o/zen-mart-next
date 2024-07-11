import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DefaultRedirectAfterLogin,
  adminRoutes,
} from "./routes";
import type { NextRequest } from "next/server";
import type { Session } from "next-auth";
import { currentRole } from "./server-actions/use-current-role";
const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn: boolean = !!req.auth;

  const isAuthAPIRoute: boolean = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute: boolean = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute: boolean = authRoutes.includes(nextUrl.pathname);
  const isAdminRoute: boolean = adminRoutes.includes(nextUrl.pathname);
  const isAdmin = (await currentRole()) === "ADMIN";

  if (isAuthAPIRoute) return;
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DefaultRedirectAfterLogin, nextUrl));
    }
    return;
  }
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }
  if (isAdminRoute) {
    if (!isLoggedIn) return Response.redirect(new URL("/auth/login", nextUrl));
    if (!isAdmin) return Response.redirect(new URL("/", nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
