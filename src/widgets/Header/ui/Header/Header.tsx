'use client';

import { getUserSelector, useLogoutMutation } from '@/entities/User';
import { UserAvatar } from '@/features/UserAvatar';
import { routeConfig } from '@/shared/config/router/routeConfig';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { SidebarTrigger } from '@/shared/ui/Sidebar/Sidebar';

import './Header.css';

export const Header = () => {
  const user = useAppSelector(getUserSelector);
  const [logout, { isLoading }] = useLogoutMutation();

  const onLogout = async () => {
    const data = await logout();
    if (!data || data.error) return;

    window.location.href = routeConfig.signIn;
  };

  return (
    <header>
      <SidebarTrigger />
      <UserAvatar
        logoutLoading={isLoading}
        userData={user}
        onLogout={onLogout}
      />
    </header>
  );
};
