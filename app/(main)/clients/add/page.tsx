import { PageContentLayout } from '@/app/layouts/PageContentLayout/PageContentLayout';
import { NewClientPage } from '@/pages/NewClientPage';

export default function NewClient() {
  return (
    <PageContentLayout title="Создание приложения">
      <NewClientPage />
    </PageContentLayout>
  );
}
