import { PageContentLayout } from '@/app/layouts/PageContentLayout/PageContentLayout';
import { ClientPage } from '@/pages/ClientPage';

type Props = { params: Promise<{ clientId: string }> };

export default async function Client({ params }: Props) {
  const { clientId } = await params;
  return (
    <PageContentLayout>
      <ClientPage clientId={clientId} />
    </PageContentLayout>
  );
}
