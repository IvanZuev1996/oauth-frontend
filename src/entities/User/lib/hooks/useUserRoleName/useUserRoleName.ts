import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';

import { userRolesConfig } from '../../../config/userRolesConfig';
import { getUserSelector } from '../../../model/selectors/user';

export const useUserRoleName = () => {
  const user = useAppSelector(getUserSelector);
  if (!user) return;
  const role = userRolesConfig[user.roleId];
  if (role === 'administrator') return 'Овнер';
  if (role === 'curator') return 'Куратор';
  if (role === 'webmaster') return 'Вебмастер';
};
