'use client';

import { BadgePlus } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

import {
  ClientItem,
  ClientStatusEnum,
  useGetClientsQuery,
} from '@/entities/Client';
import { routeConfig } from '@/shared/config/router/routeConfig';
import { EmptyData } from '@/shared/ui/EmptyData/EmptyData';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { HStack } from '@/shared/ui/Stack';

import './ClientsList.css';

type Props = {
  status?: ClientStatusEnum;
};

export const ClientsList: FC<Props> = ({ status }) => {
  const { data, isLoading, isFetching } = useGetClientsQuery({ status });

  if (isLoading || isFetching) {
    return (
      <HStack className="clients-list">
        {Array.from({ length: 4 }, (_, i) => i).map((i) => (
          <Skeleton className="h-[128px] w-full rounded-lg" key={i} />
        ))}
      </HStack>
    );
  }

  const isEmpty = !data || !data.length;

  if (isEmpty && status === ClientStatusEnum.PENDING) {
    return (
      <HStack className="clients-list">
        <EmptyData text="Нет приложений на модерации." />
      </HStack>
    );
  }

  if (isEmpty) {
    return (
      <HStack className="clients-list">
        <Link href={routeConfig.newClient}>
          <HStack className="clients-list__new">
            <BadgePlus size={18} />
            Создать первое приложение
          </HStack>
        </Link>
      </HStack>
    );
  }

  return (
    <HStack className="clients-list">
      {data.map((client) => (
        <ClientItem client={client} key={client.clientId} />
      ))}
    </HStack>
  );
};
