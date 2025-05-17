'use client';

import { useRouter } from 'next/navigation';
import { FC, PropsWithChildren, useEffect } from 'react';

import { useUserRole } from '@/entities/User';
import { routeConfig } from '@/shared/config/router/routeConfig';
import { UserRoles } from '@/shared/types/roles/roles';
import { Loader } from '@/shared/ui/Loader/Loader';

type RoleProviderProps = {
  targetRoles: UserRoles[];
} & PropsWithChildren;

export const RoleProvider: FC<RoleProviderProps> = (props) => {
  const { targetRoles, children } = props;
  const router = useRouter();
  const userRole = useUserRole();

  useEffect(() => {
    if (targetRoles.includes(userRole)) return;
    router.replace(routeConfig.main);
  }, [router, targetRoles, userRole]);

  if (!targetRoles.includes(userRole)) {
    return (
      <div className="h-screen">
        <Loader fullHeight />
      </div>
    );
  }

  return children;
};
