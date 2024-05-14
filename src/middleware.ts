import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const apiAuthPrefix = "/api/auth";
  const authRoutes = ["/auth/signin", "/auth/signup"];
  const backOfficeRoutePrefix = "/backoffice";

  const session = await getToken({
    req: req,
  });

  const isApiAuthRoute = req.nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(req.nextUrl.pathname);
  const isBackOfficeRoute = req.nextUrl.pathname.startsWith(
    backOfficeRoutePrefix
  );

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    return NextResponse.next();
  }

  if (!session && isBackOfficeRoute) {
    return NextResponse.redirect(new URL("/auth/signin", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
