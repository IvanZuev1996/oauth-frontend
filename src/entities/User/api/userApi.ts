import { rtkApi } from '@/shared/api/rtkApi';
import { ApiRoutes } from '@/shared/const/router';
import { DataWithCounting } from '@/shared/types/general/general';

import { userActions } from '../model/slice/userSlice';
import {
  GetUserQueryParams,
  GetUsersQueryParams,
  User,
} from '../model/types/user';

const userApi = rtkApi.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    getMe: builder.query<User, void>({
      query: () => {
        return {
          url: '/users/me',
          method: 'GET',
          api: ApiRoutes.SELF,
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(userActions.setUser(data));
        } catch (_) {}
      },
    }),

    logout: builder.mutation<unknown, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        api: ApiRoutes.NEXT_SELF,
      }),
    }),

    getUsersList: builder.query<DataWithCounting<User>, GetUsersQueryParams>({
      query: (params) => ({
        url: '/users',
        method: 'GET',
        params,
      }),
    }),

    getUser: builder.query<User, GetUserQueryParams>({
      query: ({ role, id }) => ({
        url: `/users/${role}/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetMeQuery,
  useGetUserQuery,
  useLogoutMutation,
  useGetUsersListQuery,
} = userApi;
