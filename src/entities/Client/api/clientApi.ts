import { rtkApi } from '@/shared/api/rtkApi';

import {
  ChangeClientStatusPayload,
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

    updateClientStatus: builder.mutation<Client, ChangeClientStatusPayload>({
      query: (body) => {
        return {
          url: '/clients/status',
          body,
          method: 'PATCH',
        };
      },
      async onQueryStarted({ clientId, status }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            clientApi.util.updateQueryData(
              'getClientData',
              { clientId },
              (draft) => {
                draft.status = status;
                draft.clientSecret = data.clientSecret;
              },
            ),
          );
          dispatch(
            clientApi.util.updateQueryData('getClients', {}, (draft) => {
              const index = draft.findIndex((c) => c.clientId === clientId);
              if (index !== -1) draft[index].status = status;
            }),
          );
        } catch (_) {}
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
  /* Mutations */
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
  useUpdateClientStatusMutation,

  /* Queries */
  useGetClientDataQuery,
  useGetClientsQuery,
  useLazyGetClientDataQuery,
} = clientApi;
