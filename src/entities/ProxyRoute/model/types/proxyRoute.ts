import { RestMethods } from '@/shared/types/general/general';

export interface ProxyRoute {
  id: number;
  name: string;
  method: RestMethods;
  externalPath: string;
  scopes?: string[];
}

export type CreateProxyRoutePayload = Omit<ProxyRoute, 'id'>;

export type UpdateProxyRoutePayload = CreateProxyRoutePayload & {
  routeId: number;
};

export type SetProxyRouteScopesPayload = {
  routeId: number;
  scopes: string[];
};
