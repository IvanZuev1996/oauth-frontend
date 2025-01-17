import { format } from 'date-fns';
import { LaptopMinimal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { getRouteClientDetails } from '@/shared/const/router';
import { cn } from '@/shared/lib/utils/cn';
import { PropsWithClassName } from '@/shared/types/general/general';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

import { ShortClientInfo } from '../../model/types/client';

import './ClientItem.css';

type Props = PropsWithClassName & {
  client: ShortClientInfo;
};

export const ClientItem: FC<Props> = ({ client, className }) => {
  const formattedDate = format(client.createdAt, 'd MMMM yyyy');

  return (
    <Link href={getRouteClientDetails(1)}>
      <HStack className={cn('client-item', className)}>
        <Image
          src="/c-black.png"
          alt="Логотип приложения"
          width={86}
          height={86}
        />
        <VStack className="gap-0 overflow-hidden">
          <HStack className="overflow-hidden">
            <Text as="h3">{client?.name}</Text>
            <LaptopMinimal size={18} />
          </HStack>
          <Text>{formattedDate}</Text>
        </VStack>
      </HStack>
    </Link>
  );
};
