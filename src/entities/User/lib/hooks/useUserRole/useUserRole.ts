import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { UserRoles } from '@/shared/types/roles/roles';

import { userRolesConfig } from '../../../config/userRolesConfig';
import { getUserSelector } from '../../../model/selectors/user';

export const useUserRole = (): UserRoles => {
  const user = useAppSelector(getUserSelector);
  if (!user) return 'webmaster';
  return userRolesConfig[user.roleId];
};
