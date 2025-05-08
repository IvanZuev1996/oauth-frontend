import { Scopes } from '@/entities/Client';

import { ScopeShortData } from '../../model/types/scope';

/**
 * @description Convert scopes object to array
 */
export const convertScopesToArray = (scopes: Scopes) => {
  const scopesArray: ScopeShortData[] = [];

  Object.keys(scopes).map((serviceName) =>
    Object.keys(scopes[serviceName]).map((scope) => {
      scopesArray.push({ key: scope, title: scopes[serviceName][scope].title });
    }),
  );

  return scopesArray;
};

/**
 * @description Convert TTL to normal time format
 */
export const convertTTL = (ttl: number): string | number => {
  if (ttl < 0) return `${ttl} сек.`;

  const totalMinutes = Math.ceil(ttl / 60);

  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;

  const parts: string[] = [];

  if (days > 0) parts.push(`${days} д.`);
  if (hours > 0) parts.push(`${hours} ч.`);
  if (minutes > 0 || parts.length === 0) parts.push(`${minutes} мин`);

  return parts.join(' ');
};
