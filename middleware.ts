import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // placeholder - in production, use supabase on server to check session
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*','/onboarding/:path*'],
};
