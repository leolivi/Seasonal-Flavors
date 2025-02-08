import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // get the token from the request ehader (JWT from cookies via NextAuth)
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  // get the current request pathname
  const { pathname } = req.nextUrl;

  // if the pathname is the homepage, return next
  if (pathname === "/" || pathname === "") {
    return NextResponse.next();
  }

  if (pathname === "/session" && token) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/my-recipes";
    return NextResponse.redirect(redirectUrl);
  }

  if (pathname === "/profile" && !token) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/session";
    return NextResponse.redirect(redirectUrl);
  }

  if (pathname === "/my-recipes" && !token) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/session";
    return NextResponse.redirect(redirectUrl);
  }

  if (pathname.match(/^\/recipes\/edit\/[^\/]+$/) && !token) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/session";
    return NextResponse.redirect(redirectUrl);
  }

  if (pathname === "/recipes/create" && !token) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/session";
    return NextResponse.redirect(redirectUrl);
  }

  if (pathname === "/favorites" && !token) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/session";
    return NextResponse.redirect(redirectUrl);
  }

  // 5. continue with the request, if no other condition is met
  return NextResponse.next();
}

// Configuration to match all paths except API routes, static files, images, etc.
export const config = {
  matcher: [
    "/session",
    "/profile",
    "/my-recipes",
    "/recipes/edit/:path*",
    "/recipes/create",
    "/favorites",
  ],
};
