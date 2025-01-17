import { rtkApi } from '@/shared/api/rtkApi';

import {
  Client,
  CreateClientPayload,
  DeleteClientPayload,
  ShortClientInfo,
  UpdateClientPayload,
} from '../model/types/client';

const clientApi = rtkApi.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    getClients: builder.query<ShortClientInfo[], void>({
      query: () => {
        return {
          url: '/clients',
          method: 'GET',
        };
      },
    }),

    getClientData: builder.query<Client, { clientId: string }>({
      query: ({ clientId }) => {
        return {
          url: `/client/${clientId}`,
          method: 'GET',
        };
      },
    }),

    createClient: builder.query<Client, CreateClientPayload>({
      query: (body) => {
        return {
          url: '/clients',
          body,
          method: 'POST',
        };
      },
    }),

    updateClient: builder.query<Client, UpdateClientPayload>({
      query: (body) => {
        return {
          url: '/clients',
          body,
          method: 'PATCH',
        };
      },
    }),

    deleteClient: builder.query<Client, DeleteClientPayload>({
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
  useCreateClientQuery,
  useDeleteClientQuery,
  useGetClientDataQuery,
  useGetClientsQuery,
  useUpdateClientQuery,
} = clientApi;
