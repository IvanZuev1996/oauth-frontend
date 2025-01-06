import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import { apiRoutesConfig } from '../config/router/routeConfig';
import { ApiRoutes } from '../const/router';
import { BaseQueryArgs } from '../types/api/rtkTypes';

import initCustomFetch from './customFetch';

const baseQuery: BaseQueryFn<BaseQueryArgs> = (...baseQueryArgs) => {
  const [args] = baseQueryArgs;

  const api = args.api || ApiRoutes.SELF;
  const { isNeedCustomQuery, baseUrl } = apiRoutesConfig[api];

  if (isNeedCustomQuery) {
    return initCustomFetch(baseUrl)(...baseQueryArgs);
  }

  return fetchBaseQuery({ baseUrl })(...baseQueryArgs);
};

export const rtkApi = createApi({
  reducerPath: 'api',
  baseQuery,

  tagTypes: ['offers', 'connectedOffers'],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endpoints: (builder) => ({}),
});
