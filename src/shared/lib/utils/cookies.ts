import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

import { cookieOptions } from '@/shared/config/cookies/cookiesOptions';

/**
 * @description Get cookie by name by client component
 */
export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)',
    ),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

/**
 * @description Set cookie by client component
 */
export function setCookie(name: string, val: string, days: number) {
  const date = new Date();
  const value = val;

  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

  document.cookie =
    name + '=' + value + '; expires=' + date.toUTCString() + '; path=/';
}

/**
 * @description Set auth cookies
 */
export const setAuthCookies = (
  access_token: string,
  refresh_token: string,
  cookieStore: ReadonlyRequestCookies,
) => {
  const options = {
    ...cookieOptions,
  };

  cookieStore.set('refresh_token', refresh_token, {
    ...options,
    httpOnly: true,
  });

  cookieStore.set('access_token', access_token, options);
};

/**
 * @description Delete cookie by client component
 */
export const deleteCookie = (name: string) => {
  document.cookie = name + '=; max-age=-1; path=/';
};
