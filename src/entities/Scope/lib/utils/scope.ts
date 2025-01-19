import { Scopes } from '@/entities/Client';

import { ScopeShortData } from '../../model/types/scope';

export const convertScopesToArray = (scopes: Scopes) => {
  const scopesArray: ScopeShortData[] = [];

  Object.keys(scopes).map((serviceName) =>
    Object.keys(scopes[serviceName]).map((scope) => {
      scopesArray.push({ key: scope, title: scopes[serviceName][scope].title });
    }),
  );

  return scopesArray;
};
