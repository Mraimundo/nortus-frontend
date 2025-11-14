import createIntlMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

export function proxy(req: NextRequest) {
  const response = intlMiddleware(req);

  const token = req.cookies.get('auth_token')?.value;
  const { pathname } = req.nextUrl;

  if (pathname === '/') {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (!token && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  if (token && pathname === '/auth/login') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
