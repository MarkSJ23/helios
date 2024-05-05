import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { getSpecificUserInfo } from "./server/queries";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  if (isProtectedRoute(request)) auth().protect();

  const id = auth().userId;

  if (id) {
    const userInfo = await getSpecificUserInfo(id);
    if (!userInfo && !request.nextUrl.pathname.startsWith("/settings")) {
      return NextResponse.redirect(new URL("/settings", request.url));
    }
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
