'use client';
import { usePathname } from 'next/navigation';

import { getUserSelector } from '@/entities/User';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from '@/shared/ui/Sidebar/Sidebar';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

import { getSidebarMenuItemsByUserRole } from '../../lib/utils/getSidebarMenuItemsByUserRole';
import { RootSidebarItem } from '../RootSidebarItem/RootSidebarItem';

import './RootSidebar.css';

export const RootSidebar = () => {
  const pathname = usePathname();
  const user = useAppSelector(getUserSelector);
  const sidebarItems = getSidebarMenuItemsByUserRole(user?.roleId);

  const getActiveState = (path: string) => pathname === path;

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarContent>
        <SidebarHeader className="aside-header">
          <VStack>
            <Text weight="bold">OAuth</Text>
          </VStack>
        </SidebarHeader>

        <SidebarGroup className="px-[15px]">
          <SidebarGroupLabel>Меню</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {sidebarItems.map((item, idx) => (
                <RootSidebarItem
                  item={item}
                  active={getActiveState(item.url)}
                  key={idx}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
