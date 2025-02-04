import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { UserRoles } from '@/shared/types/roles/roles';

import { userRolesConfig } from '../../../config/userRolesConfig';
import { getUserSelector } from '../../../model/selectors/user';

/**
 * @description Get current user role
 */
export const useUserRole = (): UserRoles => {
  const user = useAppSelector(getUserSelector);
  if (!user) return 'user';
  return userRolesConfig[user.roleId];
};
