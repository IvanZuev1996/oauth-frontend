import { selfUrl } from '@/shared/const/system';

export const makeTelegramLink = (telegram: string) => {
  return `https://t.me/${telegram}`;
};

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
