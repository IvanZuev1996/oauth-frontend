import { Ban, Check, Clock2, LucideIcon } from 'lucide-react';
import { FC } from 'react';

import { PropsWithClassName } from '@/shared/types/general/general';
import { Badge, BadgeProps } from '@/shared/ui/Badge/Badge';
import { HStack } from '@/shared/ui/Stack';

import { ClientStatusEnum } from '../../model/types/client';

type Props = PropsWithClassName & {
  status: ClientStatusEnum;
};

const clientStatusBadgeConfig: Record<
  ClientStatusEnum,
  { text: string; icon: LucideIcon; variant: BadgeProps['variant'] }
> = {
  [ClientStatusEnum.ACTIVE]: {
    text: 'Подключено',
    variant: 'success_outline',
    icon: Check,
  },
  [ClientStatusEnum.REJECTED]: {
    text: 'Отклонено',
    variant: 'destructive_outline',
    icon: Ban,
  },
  [ClientStatusEnum.PENDING]: {
    text: 'На модерации',
    variant: 'primary_outline',
    icon: Clock2,
  },
};

export const ClientStatusBadge: FC<Props> = ({ status, className }) => {
  const badgeData = clientStatusBadgeConfig[status];

  return (
    <Badge variant={badgeData.variant} className={className}>
      <HStack className="gap-1">
        <badgeData.icon size={16} />
        {badgeData.text}
      </HStack>
    </Badge>
  );
};
