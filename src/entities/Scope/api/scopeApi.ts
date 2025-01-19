import { rtkApi } from '@/shared/api/rtkApi';
import { DataWithCounting } from '@/shared/types/general/general';

import {
  CreateScopePayload,
  DeleteScopePayload,
  GetScopesPayload,
  Scope,
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

    createScope: builder.mutation<Scope, CreateScopePayload>({
      query: (body) => ({
        url: '/scopes',
        method: 'POST',
        body,
      }),
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
  useGetScopesListQuery,
  useLazyGetScopesListQuery,
  useCreateScopeMutation,
  useDeleteScopeMutation,
} = scopeApi;
