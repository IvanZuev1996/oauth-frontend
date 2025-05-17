import { rtkApi } from '@/shared/api/rtkApi';
import { DataWithCounting } from '@/shared/types/general/general';

import { ClientToken } from '../model/types/token';

const clientTokenApi = rtkApi.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    getClientTokens: builder.query<DataWithCounting<ClientToken>, void>({
      query: () => {
        return {
          url: `/clients/tokens`,
          method: 'GET',
        };
      },
    }),

    revokeClientToken: builder.mutation<
      { isRevoked: boolean },
      { clientId: string; tokenId: string }
    >({
      query: (body) => {
        return {
          url: `/clients/token/revoke`,
          method: 'PATCH',
          body,
        };
      },
      async onQueryStarted({ tokenId }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            clientTokenApi.util.updateQueryData(
              'getClientTokens',
              undefined,
              (draft) => {
                const token = draft.rows.find((r) => r.tokenId === tokenId);
                if (token) token.isRevoked = true;
              },
            ),
          );
        } catch (_) {}
      },
    }),
  }),
});

export const { useGetClientTokensQuery, useRevokeClientTokenMutation } =
  clientTokenApi;
