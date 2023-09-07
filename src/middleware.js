import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getCookie } from 'cookies-next';

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const token = request.cookies.get('token')?.value ?? ''
  const googleToken = request.cookies.get('next-auth.session-token')?.value ?? ""
  const path = request.nextUrl.pathname;
  const isAuthenticatin = token || googleToken; 
  console.log(isAuthenticatin,'isAuthenticatin')
  const isPulblicPath = path === '/login' || path === '/signup';
  if (isPulblicPath) {
    if (isAuthenticatin) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }
  else {
    if (!isAuthenticatin)
      return NextResponse.redirect(new URL('/login', request.url))
  }

}

export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/dashboard',
  ],
}