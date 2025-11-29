import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy (request: NextRequest) {
  const url = request.nextUrl;

  if (url.pathname === '/admin') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  };

  if (url.pathname === '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    '/',
    '/admin',
  ],
};