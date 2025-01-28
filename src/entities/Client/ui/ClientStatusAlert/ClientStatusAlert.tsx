import { Ban, Check, CircleAlert, LucideIcon } from 'lucide-react';
import { FC } from 'react';

import { PropsWithClassName } from '@/shared/types/general/general';
import { Alert, AlertProps } from '@/shared/ui/Alert/Alert';
import { Text } from '@/shared/ui/Text/Text';

import { ClientStatusEnum } from '../../model/types/client';

type ClientStatusConfigValue = {
  title: string;
  icon: LucideIcon;
  variant: AlertProps['variant'];
  description?: string;
};

type Props = PropsWithClassName & {
  status: ClientStatusEnum;
};

const clientStatusesConfig: Record<ClientStatusEnum, ClientStatusConfigValue> =
  {
    [ClientStatusEnum.ACTIVE]: {
      title: 'Приложение подключено',
      description: 'Все работает и вы получаете авторизации',
      variant: 'success',
      icon: Check,
    },
    [ClientStatusEnum.REJECTED]: {
      title: 'Ваше приложение отклонено',
      description: 'Причину отклонения уточните в техподдержке',
      variant: 'destructive',
      icon: Ban,
    },
    [ClientStatusEnum.PENDING]: {
      title: 'Ваше приложение находится на модерации',
      description:
        'До тех пор пока ваше приложение не будет вручную одобрено, вы не сможете получать авторизации',
      variant: 'warning',
      icon: CircleAlert,
    },
  };

export const ClientStatusAlert: FC<Props> = ({ status, className }) => {
  const statusData = clientStatusesConfig[status];

  return (
    <Alert variant={statusData.variant} className={className}>
      <statusData.icon size={18} className="mt-[2px]" />
      <Text className="text-base" weight="medium">
        {statusData.title}
      </Text>
      {statusData.description && (
        <Text variant="secondary">{statusData.description}</Text>
      )}
    </Alert>
  );
};
