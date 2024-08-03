// app/middleware.js
import { NextResponse } from 'next/server';
import { cookies } from "next/headers";

export function middleware(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  // Redirect if token is not present
  if (!token) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }


  return NextResponse.next();
}

export const config = {
  matcher: ['/categories/'], // Apply middleware to specific routes
};
