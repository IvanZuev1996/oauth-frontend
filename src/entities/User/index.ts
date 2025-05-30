/* Config */
export { userRolesConfig } from './config/userRolesConfig';

/* Lib */
export { useUserRole } from './lib/hooks/useUserRole/useUserRole';

/* Model */
export { getUserSelector } from './model/selectors/user';
export { userActions, userReducer } from './model/slice/userSlice';

/* Types */
export type {
  UserSchema,
  User,
  UsersSortField,
  AuthBackendResponse,
  SignInData,
  SignUpData,
  AccessTokenPayload,
} from './model/types/user';

/* UI */

/* Api */
export {
  useGetMeQuery,
  useLogoutMutation,
  useGetUsersListQuery,
  useGetUserQuery,
} from './api/userApi';
