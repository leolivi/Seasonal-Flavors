import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

/*
  @desc Middleware to check if the user is authenticated
*/
export async function middleware(req: NextRequest) {
  // get the token from the request ehader (JWT from cookies via NextAuth)
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  // get the current request pathname
  const { pathname } = req.nextUrl;

  // get the cookie consent
  const cookieConsent = req.cookies.get("cookieConsent");

  // if the path is "/" (home page), stay there (no further redirection)
  if (pathname === "/") {
    return NextResponse.next();
  }

  // if the cookie consent is not set, show the cookie consent banner
  if (!cookieConsent) {
    const response = NextResponse.next();
    response.headers.set("x-cookie-consent", "false");
    return response;
  }
  // if the user is authenticated and the path is /session, redirect to the my-recipes page
  if (pathname === "/session" && token) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/my-recipes";
    return NextResponse.redirect(redirectUrl);
  }

  // if the user is not authenticated, redirect to the session page
  if (pathname === "/profile" && !token) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/session";
    return NextResponse.redirect(redirectUrl);
  }

  // if the user is not authenticated and the path is /my-recipes, redirect to the home page
  if (pathname === "/my-recipes" && !token) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/";
    return NextResponse.redirect(redirectUrl);
  }

  // if the user is not authenticated and the path is /recipes/edit, redirect to the session page
  if (pathname.match(/^\/recipes\/edit\/[^\/]+$/) && !token) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/session";
    return NextResponse.redirect(redirectUrl);
  }

  // if the user is not authenticated and the path is /recipes/create, redirect to the session page
  if (pathname === "/recipes/create" && !token) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/session";
    return NextResponse.redirect(redirectUrl);
  }

  // if the user is not authenticated and the path is /favorites, redirect to the session page
  if (pathname === "/favorites" && !token) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/session";
    return NextResponse.redirect(redirectUrl);
  }

  // continue with the request, if no other condition is met
  return NextResponse.next();
}

// Configuration to match all paths except API routes, static files, images, etc.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
