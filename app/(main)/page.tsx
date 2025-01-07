import { PageContentLayout } from '@/app/layouts/PageContentLayout/PageContentLayout';
import { MainPage } from '@/pages/MainPage';

export default function Main() {
  return (
    <PageContentLayout title="Мои приложения">
      <MainPage />
    </PageContentLayout>
  );
}
