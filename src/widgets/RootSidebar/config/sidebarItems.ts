import { LayoutDashboard, BadgePlus } from 'lucide-react';

import { routeConfig } from '@/shared/config/router/routeConfig';

import { RootSidebarItemType } from '../model/types/rootSidebar';

export const sidebarMenuBaseItems: RootSidebarItemType[] = [
  {
    title: 'Мои приложения',
    url: routeConfig.main,
    icon: LayoutDashboard,
  },
  {
    title: 'Создать приложение',
    url: routeConfig.newClient,
    icon: BadgePlus,
  },
];

export const sidebarMenuAdminItems: RootSidebarItemType[] = [
  ...sidebarMenuBaseItems,
];
