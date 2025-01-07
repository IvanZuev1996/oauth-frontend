import { FC, PropsWithChildren } from 'react';

import { SidebarProvider } from '@/shared/ui/Sidebar/Sidebar';
import { Toaster } from '@/shared/ui/Toast/Toaster';
import { Header } from '@/widgets/Header';
import { RootSidebar } from '@/widgets/RootSidebar';
import './PageLayout.css';

interface PageLayoutProps extends PropsWithChildren {
  isSidebarOpen: boolean;
}

export const PageLayout: FC<PageLayoutProps> = ({
  children,
  isSidebarOpen,
}) => {
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
