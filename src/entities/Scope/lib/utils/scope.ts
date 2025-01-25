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
 * @description Convert TTL to minutes
 */
export const convertTTL = (ttl: number) => {
  if (ttl < 0) return ttl;
  const minutes = Math.ceil(ttl / 60);

  return minutes;
};
