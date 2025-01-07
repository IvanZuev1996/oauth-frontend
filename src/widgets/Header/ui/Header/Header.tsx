'use client';

import { getUserSelector } from '@/entities/User';
import { UserAvatar } from '@/features/UserAvatar';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { SidebarTrigger } from '@/shared/ui/Sidebar/Sidebar';

import './Header.css';

export const Header = () => {
  const user = useAppSelector(getUserSelector);

  return (
    <header>
      <SidebarTrigger />
      <UserAvatar />
    </header>
  );
};
