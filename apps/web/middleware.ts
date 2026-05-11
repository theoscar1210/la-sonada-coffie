/**
 * Next.js Edge Middleware — protección de rutas autenticadas.
 * Corre en el Edge Runtime antes de renderizar cualquier página.
 * Solo verifica EXISTENCIA de la cookie accessToken (el backend verifica la firma).
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rutas de autenticación: siempre públicas
const AUTH_PAGES = ['/cuenta/login', '/cuenta/registro', '/cuenta/recuperar'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Permitir rutas de auth aunque el path comience con /cuenta
  if (AUTH_PAGES.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get('accessToken');

  if (!accessToken?.value) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/cuenta/login';
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Aplica a rutas de cuenta y checkout — no a public pages ni API
  matcher: ['/cuenta/:path*', '/checkout/:path*'],
};
