import { PageContentLayout } from '@/app/layouts/PageContentLayout/PageContentLayout';
import { RoleProvider } from '@/app/providers/RoleProvider';
import { ScopesPage } from '@/pages/ScopesPage';

export default function Scopes() {
  return (
    <RoleProvider targetRoles={['admin']}>
      <PageContentLayout title="Права доступа / Scopes">
        <ScopesPage />
      </PageContentLayout>
    </RoleProvider>
  );
}
