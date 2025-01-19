'use client';

import { setDefaultOptions } from 'date-fns';
import { ru } from 'date-fns/locale';
import Image from 'next/image';
import { FC, PropsWithChildren } from 'react';

import { useGetMeQuery } from '@/entities/User';
import { Loader } from '@/shared/ui/Loader/Loader';
import { SidebarProvider } from '@/shared/ui/Sidebar/Sidebar';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { Toaster } from '@/shared/ui/Toast/Toaster';
import { Header } from '@/widgets/Header';
import { RootSidebar } from '@/widgets/RootSidebar';

setDefaultOptions({ locale: ru });

import './PageLayout.css';

interface PageLayoutProps extends PropsWithChildren {
  isSidebarOpen: boolean;
}

export const PageLayout: FC<PageLayoutProps> = (props) => {
  const { children, isSidebarOpen } = props;
  const { data, isLoading, isFetching, error } = useGetMeQuery();

  if (isLoading || isFetching) {
    return (
      <VStack className="h-screen">
        <Loader size={28} fullHeight />
      </VStack>
    );
  }

  if (!data || error) {
    return (
      <VStack className="h-screen items-center justify-center gap-0">
        <Image
          src="/error.png"
          alt="Что-то пошло не так"
          width={300}
          height={300}
          className="max-w-[300px] object-cover"
        />
        <Text className="mb-[70px] text-base">
          Что-то пошло не так. Уже решаем проблему
        </Text>
      </VStack>
    );
  }

  return (
    <div className="page-layout">
      <SidebarProvider defaultOpen={isSidebarOpen} className="w-full">
        <RootSidebar />
        <div className="page-layout__content">
          <Header />
          <main>{children}</main>
          <Toaster />
        </div>
      </SidebarProvider>
    </div>
  );
};
