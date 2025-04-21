import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ADMIN_PATH = '/admin';
const PASSWORD = process.env.ADMIN_PASSWORD || 'letmein'; // 👈 Set a real password in .env

export function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req;
  const isAdminRoute = nextUrl.pathname.startsWith(ADMIN_PATH);
  const authorized = cookies.get('admin-auth')?.value === PASSWORD;

  if (isAdminRoute && !authorized) {
    const loginUrl = new URL('/admin-login', req.url);
    loginUrl.searchParams.set('redirect', nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'], // Only run for admin routes
};