import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedClinicaRoutes = ['/dashboard', '/demandas', '/pacientes', '/receitas'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isProtectedRoute = protectedClinicaRoutes.some((route) => pathname.startsWith(route));

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const hasSession = Boolean(request.cookies.get('sb-access-token')?.value);

  if (!hasSession) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/demandas/:path*', '/pacientes/:path*', '/receitas/:path*'],
};
