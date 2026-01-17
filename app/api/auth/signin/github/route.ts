import { NextResponse } from 'next/server';

export function GET(request: Request) {
  const url = new URL(request.url);
  const from = url.searchParams.get('from');

  const redirectUrl = new URL('/api/keystatic/github/login', url.origin);
  if (from) {
    redirectUrl.searchParams.set('from', from);
  }

  return NextResponse.redirect(redirectUrl);
}
