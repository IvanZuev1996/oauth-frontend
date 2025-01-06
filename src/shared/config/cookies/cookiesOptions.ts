import { selfDomain } from '../../const/system';

export const cookieMaxAgeDays =
  parseInt(process.env.COOKIES_EXPIRES_DAYS as string) || 14;

export const cookieOptions = {
  path: '/',
  domain: selfDomain,
  maxAge: cookieMaxAgeDays * 86400,
  secure: process.env.NEXT_PUBLIC_MODE === 'production' ? true : false,
};
