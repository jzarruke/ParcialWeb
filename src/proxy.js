import { NextResponse } from "next/server";

const locales = ['es', 'en'];
const defaultLocale = 'es';
const localeCookieName = 'NEXT_LOCALE';

function getLocale(request) {
  // 1. Si ya guardamos una preferencia antes, se respeta
  const cookieLocale = request.cookies.get(localeCookieName)?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Si no hay cookie, se detecta desde el header del navegador
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferred = acceptLanguage
      .split(',')
      .map((lang) => lang.split(';')[0].trim().toLowerCase());

    for (const lang of preferred) {
      const match = locales.find((locale) => lang.startsWith(locale));
      if (match) return match;
    }
  }
  // 3. Si nada calza, se usa el idioma por defecto
  return defaultLocale;
}

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const currentLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (currentLocale) {
    // La URL ya trae idioma: solo actualizamos la cookie con esa preferencia
    const response = NextResponse.next();
    response.cookies.set(localeCookieName, currentLocale, { path: '/' });
    return response;
  }
  // No hay idioma en la URL: se detecta y se redirige
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  const response = NextResponse.redirect(request.nextUrl);
  response.cookies.set(localeCookieName, locale, { path: '/' });
  return response;
}

export const config = {
  matcher: [
    '/((?!_next).*)',
  ],
};