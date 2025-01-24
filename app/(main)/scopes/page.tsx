import { PageContentLayout } from '@/app/layouts/PageContentLayout/PageContentLayout';
import { RoleProvider } from '@/app/providers/RoleProvider';
import { ScopesPage } from '@/pages/ScopesPage';

export default function Scopes() {
  return (
    <RoleProvider targetRoles={['administrator']}>
      <PageContentLayout title="Права доступа">
        <ScopesPage />
      </PageContentLayout>
    </RoleProvider>
  );
}
