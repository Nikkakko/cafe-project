import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { checkRole } from "./utils/roles";

const isProtectedRoute = createRouteMatcher(["/admin/dashboard(.*)"]);

export default clerkMiddleware((auth, req) => {
  // if (isProtectedRoute(req)) {
  //   const url = new URL(req.nextUrl.origin);
  //   auth().protect({
  //     unauthenticatedUrl: `${url.origin}`,
  //     unauthorizedUrl: `${url.origin}`,
  //   });
  // }
  // if is protected route and user is not admin, redirect to home
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
