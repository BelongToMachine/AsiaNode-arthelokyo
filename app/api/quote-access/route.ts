import { NextRequest, NextResponse } from 'next/server';
import { createQuoteSession, quoteCookieName, safeQuotePath } from '~/shared/utils/quote-access';

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const next = safeQuotePath(data.get('next'));
  const password = process.env.QUOTE_ACCESS_PASSWORD;
  const secret = process.env.QUOTE_SESSION_SECRET;
  if (!password || !secret || data.get('password') !== password) {
    const url = new URL('/quote-access', request.url);
    url.searchParams.set('next', next);
    url.searchParams.set('error', '1');
    return NextResponse.redirect(url, 303);
  }
  const response = NextResponse.redirect(new URL(next, request.url), 303);
  response.cookies.set(quoteCookieName, await createQuoteSession(secret), {
    httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 60 * 60 * 12,
  });
  response.headers.set('Cache-Control', 'no-store');
  return response;
}
