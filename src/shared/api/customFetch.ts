import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import axios from 'axios';

import { backendUrl } from '@/shared/const/system';
import { getCookie } from '@/shared/lib/utils/cookies';

const initCustomFetch = (baseUrl: string) => {
  const mutex = new Mutex();

  const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const access_token = getCookie('access_token');
      if (access_token) headers.set('authorization', `Bearer ${access_token}`);
      return headers;
    },
  });

  const customFetch: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
  > = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          const refreshResult = await axios.post('/auth/refresh-token');
          if (refreshResult.data) {
            result = await baseQuery(args, api, extraOptions);
          }
        } catch (_) {
          window.location.href = backendUrl;
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        result = await baseQuery(args, api, extraOptions);
      }
    }

    return result;
  };

  return customFetch;
};

export default initCustomFetch;
