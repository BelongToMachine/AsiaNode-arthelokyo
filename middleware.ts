import { NextRequest, NextResponse } from 'next/server';
import { isLocale, localeFromAcceptLanguage, localePreferenceCookie } from '~/shared/utils/locale';

export function middleware(request: NextRequest) {
  const savedLocale = request.cookies.get(localePreferenceCookie)?.value;
  const locale = isLocale(savedLocale) ? savedLocale : localeFromAcceptLanguage(request.headers.get('accept-language'));

  if (locale === 'en') return NextResponse.next();

  const destination = request.nextUrl.clone();
  destination.pathname = `/${locale}`;
  return NextResponse.redirect(destination);
}

export const config = {
  matcher: ['/'],
};
