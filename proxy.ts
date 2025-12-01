"use server"
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "./lib/session";

const protectedRoutes = ['/admin', '/admin/dashboard', '/admin/kamar', '/admin/penyewa', '/admin/pembayaran']
const publicRoutes = ['/']
const authRoutes = ['/login', '/signup']

export default async function proxy (request: NextRequest) {
  const url = request.nextUrl;
  const path = url.pathname;

  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoutes = publicRoutes.includes(path);
  const isAuthRoute = authRoutes.includes(path);

  const cookie = (await cookies()).get('session')?.value;
  const session = await decrypt(cookie);

  if (!isAuthRoute && !isPublicRoutes && !session?.role) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if (!isProtectedRoute && !isPublicRoutes && session?.role === 'Admin') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.nextUrl));
  }

  if (isProtectedRoute && session?.role === 'Penyewa') {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  }

  if (isAuthRoute && session?.role === 'Admin') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.nextUrl))
  }

  if (isAuthRoute && session?.role === 'Penyewa') {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
  }

  if (url.pathname === '/admin') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  };

  // if (url.pathname === '/') {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  return NextResponse.next();
};

export const config = {
  // matcher: [
  //   '/',
  //   '/admin',
  // ],
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};