import { rtkApi } from '@/shared/api/rtkApi';

import { OAuthAuthorizeParams } from '../model/types/oauth';

const OAuthApi = rtkApi.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    oauthAuthorize: builder.query<{ url: string }, OAuthAuthorizeParams>({
      query: (params) => {
        return {
          url: '/oauth/authorize',
          method: 'GET',
          params,
        };
      },
    }),
  }),
});

export const { useLazyOauthAuthorizeQuery } = OAuthApi;
