import { LaptopMinimal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { getRouteClientDetails } from '@/shared/const/router';
import { backendUrl } from '@/shared/const/system';
import { cn } from '@/shared/lib/utils/cn';
import { formatDate } from '@/shared/lib/utils/formatDate';
import { PropsWithClassName } from '@/shared/types/general/general';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

import { ShortClientInfo } from '../../model/types/client';
import { ClientStatusBadge } from '../ClientStatusBadge/ClientStatusBadge';

import './ClientItem.css';

type Props = PropsWithClassName & {
  client: ShortClientInfo;
};

export const ClientItem: FC<Props> = ({ client, className }) => {
  return (
    <Link href={getRouteClientDetails(client.clientId)} className="relative">
      <HStack
        className={cn('client-item', className)}
        data-banned={client.isBanned}
      >
        <Image
          src={`${backendUrl}${client.img}`}
          alt="Логотип приложения"
          width={86}
          height={86}
        />
        <VStack className="gap-0 overflow-hidden">
          <ClientStatusBadge
            status={client.status}
            isBanned={client.isBanned}
            className="mb-2"
          />
          <HStack className="overflow-hidden">
            <Text as="h3">{client?.name}</Text>
            <LaptopMinimal size={18} />
          </HStack>
          <Text>{formatDate(client.createdAt)}</Text>
        </VStack>
      </HStack>
    </Link>
  );
};
