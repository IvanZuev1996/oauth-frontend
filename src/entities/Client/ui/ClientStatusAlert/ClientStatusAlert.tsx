import { Ban, Check, CircleAlert, LucideIcon } from 'lucide-react';
import { FC } from 'react';

import { useUserRole } from '@/entities/User';
import { PropsWithClassName } from '@/shared/types/general/general';
import { Alert, AlertProps } from '@/shared/ui/Alert/Alert';
import { Button } from '@/shared/ui/Button/Button';
import { HStack } from '@/shared/ui/Stack';
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
  isBanned?: boolean;
  onModerationClick?: () => void;
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

const adminStatusesConfig: Record<ClientStatusEnum, ClientStatusConfigValue> = {
  [ClientStatusEnum.ACTIVE]: {
    title: 'Приложение подключено',
    description: 'Приложение было одобрено. Все работает.',
    variant: 'success',
    icon: Check,
  },
  [ClientStatusEnum.REJECTED]: {
    title: 'Приложение отклонено',
    description: 'Приложение было отклонено.',
    variant: 'destructive',
    icon: Ban,
  },
  [ClientStatusEnum.PENDING]: {
    title: 'Требуется действие с приложением',
    description:
      'Вы можете одобрить или отклонить приложение, а также дать дополнительные ограничения на это приложение.',
    variant: 'warning',
    icon: CircleAlert,
  },
};

export const ClientStatusAlert: FC<Props> = (props) => {
  const { status, className, isBanned, onModerationClick } = props;

  const userRole = useUserRole();
  const isAdmin = userRole === 'admin';
  const statusData = isAdmin
    ? adminStatusesConfig[status]
    : clientStatusesConfig[status];

  const isShowActions = status === ClientStatusEnum.PENDING && isAdmin;

  if (isBanned) {
    return (
      <Alert variant="destructive" className={className}>
        <Ban size={18} className="mt-[2px]" />
        <Text className="text-base" weight="medium">
          Приложение заблокировано администратором
        </Text>
        <Text variant="secondary">
          {isAdmin ? 'Это' : 'Ваше'} приложение больше не может получать
          авторизации
        </Text>
      </Alert>
    );
  }

  return (
    <Alert variant={statusData.variant} className={className}>
      <statusData.icon size={18} className="mt-[2px]" />
      <Text className="text-base" weight="medium">
        {statusData.title}
      </Text>
      {statusData.description && (
        <Text variant="secondary">{statusData.description}</Text>
      )}

      {isShowActions && (
        <HStack className="mt-3 justify-end">
          <Button
            onClick={onModerationClick}
            className="h-10 w-full max-w-[220px]"
          >
            Перейти к модерации
          </Button>
        </HStack>
      )}
    </Alert>
  );
};
