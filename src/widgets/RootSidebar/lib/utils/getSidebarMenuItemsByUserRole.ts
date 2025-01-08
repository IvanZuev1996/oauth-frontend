import { sidebarMenuBaseItems } from '../../config/sidebarItems';

export const getSidebarMenuItemsByUserRole = (roleId?: number) => {
  // const userRole = userRolesConfig[roleId || 0];
  // if (!roleId || !userRole) return [];

  // if (userRole === 'administrator') return sidebarMenuAdminItems;
  return sidebarMenuBaseItems;
};
