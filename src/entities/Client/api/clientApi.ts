import { rtkApi } from '@/shared/api/rtkApi';

import {
  Client,
  ClientStatusEnum,
  ClientWithScopeDetails,
  CreateClientPayload,
  DeleteClientPayload,
  ShortClientInfo,
  UpdateClientPayload,
} from '../model/types/client';

const clientApi = rtkApi.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    getClients: builder.query<ShortClientInfo[], { status?: ClientStatusEnum }>(
      {
        query: (params) => {
          return {
            url: '/clients',
            method: 'GET',
            params,
          };
        },
      },
    ),

    getClientData: builder.query<ClientWithScopeDetails, { clientId: string }>({
      query: ({ clientId }) => {
        return {
          url: `/clients/${clientId}`,
          method: 'GET',
        };
      },
    }),

    createClient: builder.mutation<Client, CreateClientPayload>({
      query: (body) => {
        return {
          url: '/clients',
          body,
          method: 'POST',
        };
      },
    }),

    updateClient: builder.mutation<Client, UpdateClientPayload>({
      query: (body) => {
        return {
          url: '/clients',
          body,
          method: 'PATCH',
        };
      },
    }),

    deleteClient: builder.mutation<Client, DeleteClientPayload>({
      query: (body) => {
        return {
          url: '/clients',
          body,
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const {
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
  useGetClientDataQuery,
  useGetClientsQuery,
  useLazyGetClientDataQuery,
} = clientApi;
