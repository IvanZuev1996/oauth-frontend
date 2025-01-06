import { jwtVerify } from 'jose';
import {
  RequestCookies,
  ResponseCookies,
} from 'next/dist/server/web/spec-extension/cookies';
import { type NextRequest, NextResponse } from 'next/server';

import { cookieOptions } from '@/shared/config/cookies/cookiesOptions';
import { accessTokenSecret, backendUrl } from '@/shared/const/system';

const PUBLIC_FILE = /\.(.*)$/;

interface AuthBackendResponse {
  type: string;
  access_token: string;
  refresh_token: string;
}

export interface AccessTokenPayload {
  user_id: number;
  service: string;
  login: string;
  iat: number;
  exp: number;
}

function applySetCookie(req: NextRequest, res: NextResponse): void {
  const setCookies = new ResponseCookies(res.headers);
  const newReqHeaders = new Headers(req.headers);
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
  return NextResponse.next();
  const { pathname } = request.nextUrl;

  const refresh_token = request.cookies.get('refresh_token')?.value;
  const access_token = request.cookies.get('access_token')?.value;

  if (
    pathname.startsWith('/.next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/auth/refresh-token') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (!access_token || !refresh_token) {
    return NextResponse.redirect('/');
  }

  const data = await refreshTokenHandler(access_token, refresh_token);

  if (data.isError) {
    const options = {
      ...cookieOptions,
      maxAge: -1,
    };
    const response = NextResponse.redirect('/');
    response.cookies.set('access_token', '', options);
    response.cookies.set('refresh_token', '', {
      ...options,
      httpOnly: true,
    });
    applySetCookie(request, response);
    return response;
  }

  if (data.isUpdated) {
    const options = { ...cookieOptions };

    const response = NextResponse.next();

    response.cookies.set('access_token', data.updated_access_token!, options);
    response.cookies.set('refresh_token', data.updated_refresh_token!, {
      ...options,
      httpOnly: true,
    });
    applySetCookie(request, response);
    return response;
  }

  return NextResponse.next();
}
