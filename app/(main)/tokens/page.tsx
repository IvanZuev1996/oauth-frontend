import { PageContentLayout } from '@/app/layouts/PageContentLayout/PageContentLayout';
import { RoleProvider } from '@/app/providers/RoleProvider';
import { TokensPage } from '@/pages/TokensPage';

export default function Tokens() {
  return (
    <RoleProvider targetRoles={['admin']}>
      <PageContentLayout title="Выданные токены">
        <TokensPage />
      </PageContentLayout>
    </RoleProvider>
  );
}
