import { PageContentLayout } from '@/app/layouts/PageContentLayout/PageContentLayout';
import { EditClientPage } from '@/pages/EditClientPage';

type Props = { params: Promise<{ clientId: string }> };

export default async function EditClient({ params }: Props) {
  const { clientId } = await params;

  return (
    <PageContentLayout>
      <EditClientPage clientId={clientId} />
    </PageContentLayout>
  );
}
