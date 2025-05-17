'use client';

import { useUserRole } from '@/entities/User';
import { ClientsList } from '@/widgets/ClientsList';

export const MainPage = () => {
  const userRole = useUserRole();
  return (
    <>
      <h1 className="mb-5">
        {userRole === 'admin' ? 'Все' : 'Мои'} приложения
      </h1>
      <ClientsList />
    </>
  );
};
