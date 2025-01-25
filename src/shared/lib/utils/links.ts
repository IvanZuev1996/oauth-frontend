import { selfUrl } from '@/shared/const/system';

/**
 * @description Make telegram link by tg username
 */
export const makeTelegramLink = (telegram: string) => {
  return `https://t.me/${telegram}`;
};

/**
 * @description Generate URI with query params
 */
export const generateURIWithQueryParams = (
  pathname: string,
  queryParams: Record<string, string>,
) => {
  const uri = new URL(pathname, selfUrl);
  Object.entries(queryParams).forEach(([key, value]) => {
    uri.searchParams.append(key, value);
  });
  return uri.href;
};
