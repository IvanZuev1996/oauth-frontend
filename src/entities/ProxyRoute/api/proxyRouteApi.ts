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

    createProxyRoutes: builder.mutation<ProxyRoute, CreateProxyRoutePayload>({
      query: (body) => ({
        url: '/proxy',
        method: 'POST',
        body,
      }),
      async onQueryStarted({ scopes }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            proxyRouteApi.util.updateQueryData(
              'getProxyRoutesList',
              undefined,
              (draft) => {
                draft.count += 1;
                draft.rows.push({ ...data, scopes });
              },
            ),
          );
        } catch (_) {}
      },
    }),

    updateProxyRoute: builder.mutation<ProxyRoute, UpdateProxyRoutePayload>({
      query: (body) => ({
        url: '/proxy',
        method: 'PATCH',
        body,
      }),
      async onQueryStarted({ scopes }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            proxyRouteApi.util.updateQueryData(
              'getProxyRoutesList',
              undefined,
              (draft) => {
                const route = draft.rows.find((r) => r.id === data.id);
                if (!route) return;
                route.method = data.method;
                route.externalPath = data.externalPath;
                route.name = data.name;
                route.scopes = scopes;
              },
            ),
          );
        } catch (_) {}
      },
    }),

    deleteProxyRoute: builder.mutation<{ deleted: boolean }, { id: number }>({
      query: ({ id }) => ({
        url: `/proxy/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            proxyRouteApi.util.updateQueryData(
              'getProxyRoutesList',
              undefined,
              (draft) => {
                draft.count -= 1;
                draft.rows = draft.rows.filter((r) => r.id !== id);
              },
            ),
          );
        } catch (_) {}
      },
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
