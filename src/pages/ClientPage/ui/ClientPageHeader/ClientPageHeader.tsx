import { LaptopMinimal, Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { ClientWithScopeDetails } from '@/entities/Client';
import { getRouteEditClient } from '@/shared/const/router';
import { backendUrl } from '@/shared/const/system';
import { formatDate } from '@/shared/lib/utils/formatDate';
import { Button, buttonVariants } from '@/shared/ui/Button/Button';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

type Props = {
  data?: ClientWithScopeDetails;
};

export const ClientPageHeader: FC<Props> = ({ data }) => {
  if (!data) {
    return (
      <VStack className="mb-5 gap-1">
        <Skeleton className="h-[32px] w-[240px]" />
      </VStack>
    );
  }

  return (
    <HStack className="mb-5">
      <Image
        src={`${backendUrl}${data.img}`}
        alt="Логотип приложения"
        width={86}
        height={86}
      />

      <VStack className="gap-1">
        <HStack>
          <h1>{data.name}</h1>
          <LaptopMinimal size={18} className="mt-[10px]" />
        </HStack>
        <Text variant="secondary">Создано: {formatDate(data.createdAt)}</Text>
      </VStack>

      <HStack className="ml-auto" max={false}>
        <Link
          href={getRouteEditClient(data.clientId)}
          className={buttonVariants({ variant: 'secondary', size: 'lg' })}
        >
          <Pencil size={18} />
        </Link>

        <Button size="lg" variant="secondary">
          <Trash2 size={18} />
        </Button>
      </HStack>
    </HStack>
  );
};
