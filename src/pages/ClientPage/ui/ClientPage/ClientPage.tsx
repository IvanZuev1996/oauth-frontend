'use client';

import { LaptopMinimal } from 'lucide-react';
import { FC } from 'react';

import { useGetClientDataQuery } from '@/entities/Client';
import { formatDate } from '@/shared/lib/utils/formatDate';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { ClientDetails } from '@/widgets/ClientDetails';

import './ClientPage.css';

type Props = {
  clientId: string;
};

export const ClientPage: FC<Props> = ({ clientId }) => {
  const { data, isLoading, isFetching } = useGetClientDataQuery({ clientId });

  return (
    <>
      <VStack className="mb-5 gap-1">
        {!data ? (
          <Skeleton className="h-[32px] w-[240px]" />
        ) : (
          <>
            <HStack>
              <h1>{data.name}</h1>
              <LaptopMinimal size={18} className="mt-[10px]" />
            </HStack>
            <Text variant="secondary">
              Создано: {formatDate(data.createdAt)}
            </Text>
          </>
        )}
      </VStack>
      <ClientDetails data={data} isLoading={isLoading || isFetching} />
    </>
  );
};
