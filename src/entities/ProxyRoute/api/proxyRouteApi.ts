import { rtkApi } from '@/shared/api/rtkApi';
import { DataWithCounting } from '@/shared/types/general/general';

import {
  CreateProxyRoutePayload,
  ProxyRoute,
  UpdateProxyRoutePayload,
} from '../model/types/proxyRoute';

const proxyRouteApi = rtkApi.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    getProxyRoutesList: builder.query<DataWithCounting<ProxyRoute>, void>({
      query: (params) => ({
        url: '/proxy',
        method: 'GET',
        params,
      }),
    }),

    createProxyRoutes: builder.mutation<ProxyRoute[], CreateProxyRoutePayload>({
      query: (body) => ({
        url: '/proxy',
        method: 'POST',
        body,
      }),
    }),

    updateProxyRoute: builder.mutation<ProxyRoute, UpdateProxyRoutePayload>({
      query: (body) => ({
        url: '/proxy',
        method: 'PATCH',
        body,
      }),
    }),

    deleteProxyRoute: builder.mutation<{ deleted: boolean }, { id: number }>({
      query: (body) => ({
        url: '/proxy',
        method: 'DELETE',
        body,
      }),
    }),
  }),
});

export const {
  /* Queries */
  useGetProxyRoutesListQuery,

  /* Mutations */
  useCreateProxyRoutesMutation,
  useDeleteProxyRouteMutation,
  useUpdateProxyRouteMutation,
} = proxyRouteApi;
