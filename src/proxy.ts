import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  const authToken = request.cookies.get('auth_token')?.value;

  // Check if they are trying to access dashboard but don't have the cookie
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (authToken !== 'authenticated') {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};
