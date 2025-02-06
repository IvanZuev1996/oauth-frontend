import { rtkApi } from '@/shared/api/rtkApi';
import { DataWithCounting } from '@/shared/types/general/general';

import {
  ChangeScopeStatusPayload,
  CreateScopePayload,
  DeleteScopePayload,
  GetScopesPayload,
  Scope,
  ScopeListItem,
} from '../model/types/scope';

const scopeApi = rtkApi.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    getScopesList: builder.query<
      DataWithCounting<ScopeListItem>,
      GetScopesPayload
    >({
      query: (params) => ({
        url: '/scopes',
        method: 'GET',
        params,
      }),
    }),

    getScope: builder.query<Scope, { scopeKey: string }>({
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

    deleteScope: builder.mutation<{ isDeleted: boolean }, DeleteScopePayload>({
      query: (body) => ({
        url: '/scopes',
        method: 'DELETE',
        body,
      }),
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
  useUpdateScopeStatusMutation,
} = scopeApi;
