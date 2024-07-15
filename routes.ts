/**
 * Array Of Routes Accessible To The Public
 * These Routes Do Not Require The User To Be Logged In
 * @name publicRoutes
 * @type {string[]}
 */
export const publicRoutes: string[] = [
  "/",
  "/auth/new-verification",
  "/api/upload",
  "/categories/*",
  "/products/*",
];

/**
 * Array Of Routes For Authentication
 * These Routes Are Used For User Authentication
 * @name authRoutes
 * @type {string[]}
 * Redirects Authenticated Users To /settings
 */
export const authRoutes: string[] = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * Array Of Routes For Admin
 * These Routes Are Used By Admin Only
 * @name adminRoutes
 * @type {string[]}
 * Redirects Not Admins To /
 */
export const adminRoutes: string[] = [
  "/admin/dashboard",
  // "/admin/dashboard/analytics",
  // "/admin/dashboard/products",
  // "/admin/dashboard/categories",
  // "/admin/dashboard/campaigns",
];

/**
 * Prefix For Authentication-Related API Routes
 * Routes Starting With This Prefix Are Used For Authentication Processes
 * @name apiAuthPrefix
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * Users Are Redirected To This Route After Login
 * @name DefaultRedirectAfterLogin
 * @type {string}
 */
export const DefaultRedirectAfterLogin: string =
  "/settings?redirected_from=login";
