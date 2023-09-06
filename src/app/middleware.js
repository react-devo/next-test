import { NextResponse } from 'next/server'
import { getCookie } from 'cookies-next';

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const token = getCookie("token");
  const path = request.nextUrl.pathname;
  const isPulblicPath = path === '/login' || path === '/signup';
  if (isPulblicPath && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  if (!isPulblicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

}

export const config = {
  matcher: [
    '/',
    'login',
    'signup',
    'dashboard',
  ],
}