import { PageContentLayout } from '@/app/layouts/PageContentLayout/PageContentLayout';
import { RoleProvider } from '@/app/providers/RoleProvider';
import { OnModerationPage } from '@/pages/OnModerationPage';

export default function OnModeration() {
  return (
    <PageContentLayout title="Приложения на модерации">
      <RoleProvider targetRoles={['admin']}>
        <OnModerationPage />
      </RoleProvider>
    </PageContentLayout>
  );
}
