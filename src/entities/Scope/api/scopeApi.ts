import { rtkApi } from '@/shared/api/rtkApi';
import { DataWithCounting } from '@/shared/types/general/general';

import {
  ChangeScopeStatusPayload,
  CreateScopePayload,
  DeleteScopePayload,
  GetScopesPayload,
  Scope,
  ScopeDetails,
  UpdateScopePayload,
} from '../model/types/scope';

const scopeApi = rtkApi.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    getScopesList: builder.query<DataWithCounting<Scope>, GetScopesPayload>({
      query: (params) => ({
        url: '/scopes',
        method: 'GET',
        params,
      }),
    }),

    getScope: builder.query<ScopeDetails, { scopeKey: string }>({
      query: ({ scopeKey }) => ({
        url: `/scopes/${scopeKey}`,
        method: 'GET',
      }),
    }),

    createScope: builder.mutation<Scope, CreateScopePayload>({
      query: (body) => ({
        url: '/scopes',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            scopeApi.util.updateQueryData('getScopesList', {}, (draft) => {
              draft.count += 1;
              draft.rows.push(data);
            }),
          );
        } catch (_) {}
      },
    }),

    updateScope: builder.mutation<Scope, UpdateScopePayload>({
      query: (body) => ({
        url: '/scopes',
        method: 'PATCH',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            scopeApi.util.updateQueryData('getScopesList', {}, (draft) => {
              const scope = draft.rows.find((item) => item.key === data.key);
              if (!scope) return;
              scope.title = data.title;
              scope.ttl = data.ttl;
            }),
          );
          dispatch(
            scopeApi.util.updateQueryData(
              'getScope',
              { scopeKey: data.key },
              (draft) => {
                draft.title = data.title;
                draft.ttl = data.ttl;
                draft.status = data.status;
                draft.requiresApproval = data.requiresApproval;
              },
            ),
          );
        } catch (_) {}
      },
    }),

    updateScopeStatus: builder.mutation<
      { changed: boolean },
      ChangeScopeStatusPayload
    >({
      query: (body) => ({
        url: '/scopes/status',
        method: 'PATCH',
        body,
      }),
      async onQueryStarted({ scopeKey, status }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            scopeApi.util.updateQueryData('getScopesList', {}, (draft) => {
              const scope = draft.rows.find((item) => item.key === scopeKey);
              if (scope) scope.status = status;
            }),
          );
          dispatch(
            scopeApi.util.updateQueryData('getScope', { scopeKey }, (draft) => {
              draft.status = status;
            }),
          );
        } catch (_) {}
      },
    }),

    deleteScope: builder.mutation<{ deleted: boolean }, DeleteScopePayload>({
      query: (body) => ({
        url: '/scopes',
        method: 'DELETE',
        body,
      }),
      async onQueryStarted({ scopeKey }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (!data.deleted) return;
          dispatch(
            scopeApi.util.updateQueryData('getScopesList', {}, (draft) => {
              draft.count -= 1;
              draft.rows = draft.rows.filter((item) => item.key !== scopeKey);
            }),
          );
        } catch (_) {}
      },
    }),
  }),
});

export const {
  /* Queries */
  useGetScopesListQuery,
  useGetScopeQuery,
  useLazyGetScopesListQuery,

  /* Mutations */
  useCreateScopeMutation,
  useDeleteScopeMutation,
  useUpdateScopeMutation,
  useUpdateScopeStatusMutation,
} = scopeApi;
