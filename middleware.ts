import { NextRequest, NextResponse } from 'next/server';
import { isLocale, localeFromAcceptLanguage, localePreferenceCookie } from '~/shared/utils/locale';
import { quoteCookieName, validQuoteSession } from '~/shared/utils/quote-access';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname !== '/') {
    if (await validQuoteSession(request.cookies.get(quoteCookieName)?.value, process.env.QUOTE_SESSION_SECRET)) {
      const response = NextResponse.next();
      response.headers.set('Cache-Control', 'private, no-store');
      response.headers.set('X-Robots-Tag', 'noindex, nofollow');
      return response;
    }
    const url = request.nextUrl.clone();
    url.pathname = '/quote-access';
    url.search = '';
    url.searchParams.set('next', request.nextUrl.pathname);
    const response = NextResponse.redirect(url);
    response.headers.set('Cache-Control', 'no-store');
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }
  const savedLocale = request.cookies.get(localePreferenceCookie)?.value;
  const locale = isLocale(savedLocale) ? savedLocale : localeFromAcceptLanguage(request.headers.get('accept-language'));

  if (locale === 'en') return NextResponse.next();

  const destination = request.nextUrl.clone();
  destination.pathname = `/${locale}`;
  return NextResponse.redirect(destination);
}

export const config = {
  matcher: ['/', '/quote', '/quote/', '/zh/quote', '/zh/quote/', '/tr/quote', '/tr/quote/'],
};
