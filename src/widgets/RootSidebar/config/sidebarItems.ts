import {
  LayoutDashboard,
  BadgePlus,
  KeyRound,
  LockKeyholeOpen,
  Wrench,
  Replace,
} from 'lucide-react';

import { routeConfig } from '@/shared/config/router/routeConfig';

import { RootSidebarItemType } from '../model/types/rootSidebar';

export const sidebarMenuBaseItems: RootSidebarItemType[] = [
  {
    title: 'Все приложения',
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
  {
    title: 'На модерации',
    url: routeConfig.moderation,
    icon: Wrench,
  },
  {
    title: 'Права доступа',
    url: routeConfig.scopes,
    icon: LockKeyholeOpen,
  },
  {
    title: 'Proxy маршруты',
    url: routeConfig.proxyRoutes,
    icon: Replace,
  },
  {
    title: 'Токены',
    url: routeConfig.tokens,
    icon: KeyRound,
  },
];
