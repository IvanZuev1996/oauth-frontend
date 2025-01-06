/* Config */
export { userRolesConfig } from './config/userRolesConfig';

/* Lib */
export { useUserRole } from './lib/hooks/useUserRole/useUserRole';
export { useUserRoleName } from './lib/hooks/useUserRoleName/useUserRoleName';

/* Model */
export { getUserSelector } from './model/selectors/user';
export { userActions, userReducer } from './model/slice/userSlice';

/* Types */
export type {
  UserSchema,
  User,
  UserLevelType,
  UsersSortField,
} from './model/types/user';

/* UI */

/* Api */
export {
  useGetMeQuery,
  useLogoutMutation,
  useGetUsersListQuery,
  useGetUserQuery,
} from './api/userApi';
