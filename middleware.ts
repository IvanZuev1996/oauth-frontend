import { jwtVerify } from 'jose';
import {
  RequestCookies,
  ResponseCookies,
} from 'next/dist/server/web/spec-extension/cookies';
import { type NextRequest, NextResponse } from 'next/server';

import { AccessTokenPayload, AuthBackendResponse } from '@/entities/User';
import { cookieOptions } from '@/shared/config/cookies/cookiesOptions';
import {
  apiRoutes,
  authPageRoutes,
  routeConfig,
} from '@/shared/config/router/routeConfig';
import { accessTokenSecret, backendUrl } from '@/shared/const/system';

const PUBLIC_FILE = /\.(.*)$/;

/**
 * Костыль для патча кук и заголовков
 */
function applySetCookieAndHeaders(req: NextRequest, res: NextResponse): void {
  const setCookies = new ResponseCookies(res.headers);
  const newReqHeaders = new Headers(req.headers);

  newReqHeaders.set('x-middleware-request-data', 'hello');

  const newReqCookies = new RequestCookies(newReqHeaders);
  setCookies.getAll().forEach((cookie) => newReqCookies.set(cookie));
  NextResponse.next({
    request: { headers: newReqHeaders },
  }).headers.forEach((value, key) => {
    if (
      key === 'x-middleware-override-headers' ||
      key.startsWith('x-middleware-request-')
    ) {
      res.headers.set(key, value);
    }
  });
}

const verifyJWT = async <T>(token: string): Promise<T | { error: string }> => {
  try {
    return (await jwtVerify(token, new TextEncoder().encode(accessTokenSecret)))
      .payload as T;
  } catch (error) {
    const { code } = error as { code: string };
    return { error: code };
  }
};

const refreshTokenHandler = async (
  access_token: string,
  refresh_token: string,
) => {
  let isError = false;
  let isUpdated = false;
  let updated_access_token: string | undefined = undefined;
  let updated_refresh_token: string | undefined = undefined;

  const verifyResult = await verifyJWT<AccessTokenPayload>(access_token);
  if ('error' in verifyResult) {
    const { error } = verifyResult;
    if (error === 'ERR_JWT_EXPIRED') {
      try {
        const response = await fetch(`${backendUrl}/auth/refresh-token`, {
          method: 'POST',
          body: JSON.stringify({ refresh_token }),
          headers: { 'Content-Type': 'application/json' },
        });
        const res: AuthBackendResponse = await response.json();
        updated_access_token = res.access_token;
        updated_refresh_token = res.refresh_token;
        isUpdated = true;
      } catch (_) {
        isError = true;
      }
    } else {
      isError = true;
    }
  }

  return { isError, isUpdated, updated_access_token, updated_refresh_token };
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const signinUrl = new URL(routeConfig.signIn, request.url);
  const mainUrl = new URL(routeConfig.main, request.url);

  const refreshToken = request.cookies.get('refresh_token')?.value;
  const accessToken = request.cookies.get('access_token')?.value;

  /* Ignore static and API routes */
  if (
    pathname.startsWith('/.next') ||
    pathname.startsWith('/static') ||
    PUBLIC_FILE.test(pathname) ||
    apiRoutes.includes(pathname)
  ) {
    return NextResponse.next();
  }

  /* Auth routes */
  if (authPageRoutes.includes(pathname)) {
    if (accessToken && refreshToken) return NextResponse.redirect(mainUrl);
    const response = NextResponse.next();
    response.headers.set('x-ignore-theme', 'ignore');
    return response;
  }

  if (!accessToken || !refreshToken) return NextResponse.redirect(signinUrl);
  const data = await refreshTokenHandler(accessToken, refreshToken);

  /* Refresh token error */
  if (data.isError) {
    const options = { ...cookieOptions, maxAge: -1 };
    const response = NextResponse.redirect(signinUrl);
    response.cookies.set('access_token', '', options);
    response.cookies.set('refresh_token', '', { ...options, httpOnly: true });
    applySetCookieAndHeaders(request, response);
    return response;
  }

  /* Refresh token updated */
  if (data.isUpdated) {
    const options = { ...cookieOptions };

    const response = NextResponse.next();
    response.cookies.set('access_token', data.updated_access_token!, options);
    response.cookies.set('refresh_token', data.updated_refresh_token!, {
      ...options,
      httpOnly: true,
    });
    applySetCookieAndHeaders(request, response);
    return response;
  }

  /* Other cases */
  return NextResponse.next();
}
