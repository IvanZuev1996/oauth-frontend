import { LaptopMinimal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { getRouteClientDetails } from '@/shared/const/router';
import { cn } from '@/shared/lib/utils/cn';
import { PropsWithClassName } from '@/shared/types/general/general';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

import { Client } from '../../model/types/client';

import './ClientItem.css';

type Props = PropsWithClassName & {
  client?: Client;
};

export const ClientItem: FC<Props> = ({ client, className }) => {
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
            <Text as="h3">RP_LOCAL</Text>
            <LaptopMinimal size={18} />
          </HStack>
          <Text>1 октября 2024</Text>
        </VStack>
      </HStack>
    </Link>
  );
};
