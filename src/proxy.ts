import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Reads the Auth.js JWT from the request cookie (no DB call) and guards routes by role.
export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    // Auth.js v5 uses the "authjs" cookie prefix.
    cookieName:
      process.env.NODE_ENV === "production"
        ? "__Secure-authjs.session-token"
        : "authjs.session-token",
  });

  const { pathname } = request.nextUrl;
  const isLoggedIn = !!token;
  const role = token?.role as string | undefined;

  // /admin — admins only
  if (pathname.startsWith("/admin")) {
    if (!isLoggedIn) {
      const url = new URL("/login", request.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // /account — any logged-in user
  if (pathname.startsWith("/account") && !isLoggedIn) {
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*"],
};
