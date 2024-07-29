import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const publicRoutes = [
  "/signin",
  "/signup",
  "/forgot-password",
  "/forgot-password/",
];

export default auth((req) => {
  console.log("teste", publicRoutes.includes(req.nextUrl.pathname));
  if (!req.auth && !publicRoutes.includes(req.nextUrl.pathname)) {
    // return NextResponse.redirect(new URL("/signin", req.nextUrl.origin));
  }

  if (req.auth && publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Always run for API routes
//     "/(api|trpc)(.*)",
//   ],
// };
