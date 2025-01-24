import { userRolesConfig } from '@/entities/User';

import {
  sidebarMenuAdminItems,
  sidebarMenuBaseItems,
} from '../../config/sidebarItems';

export const getSidebarMenuItemsByUserRole = (roleId?: number) => {
  if (!roleId) return [];

  const userRole = userRolesConfig[roleId];
  if (!userRole) return [];

  if (userRole === 'administrator') return sidebarMenuAdminItems;
  return sidebarMenuBaseItems;
};
