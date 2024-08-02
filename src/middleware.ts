import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const publicRoutes = [
  "/signin",
  "/signup",
  "/forgot-password",
  new RegExp("^/forgot-password/.*$"),
];

const privateRoutes = [new RegExp("^/admin/.*$")];

export default auth((req) => {
  const path = req.nextUrl.pathname;

  const isPublicRoute = publicRoutes.some((route) =>
    typeof route === "string" ? route === path : route.test(path)
  );

  const isAdminRoute = privateRoutes.some((route) => route.test(path));

  if (req.auth && req.auth.user.role !== "ADMIN" && isAdminRoute) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }
  if (!req.auth && !isPublicRoute) {
    return NextResponse.redirect(new URL("/signin", req.nextUrl.origin));
  }

  if (req.auth && isPublicRoute) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Always run for API routes
//     "/(api|trpc)(.*)",
//   ],
// };
