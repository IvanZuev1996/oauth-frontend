import { PageContentLayout } from '@/app/layouts/PageContentLayout/PageContentLayout';
import { RoleProvider } from '@/app/providers/RoleProvider';
import { ProxyRoutesPage } from '@/pages/ProxyRoutesPage';

export default function ProxyRoutes() {
  return (
    <RoleProvider targetRoles={['admin']}>
      <PageContentLayout title="Управление маршрутами Proxy-сервера">
        <ProxyRoutesPage />
      </PageContentLayout>
    </RoleProvider>
  );
}
