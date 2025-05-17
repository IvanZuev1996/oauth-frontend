import { FC } from 'react';

import { EditClientForm } from '@/widgets/EditClientForm';

type Props = {
  clientId: string;
};

export const EditClientPage: FC<Props> = ({ clientId }) => {
  return <EditClientForm clientId={clientId} />;
};
