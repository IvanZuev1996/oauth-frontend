'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';

import {
  ProxyRoute,
  ProxyRouteCard,
  useGetProxyRoutesListQuery,
} from '@/entities/ProxyRoute';
import { EditableProxyRouteModal } from '@/features/EditableProxyRouteModal';
import { Button } from '@/shared/ui/Button/Button';
import { EmptyData } from '@/shared/ui/EmptyData/EmptyData';
import { Loader } from '@/shared/ui/Loader/Loader';
import { HStack, VStack } from '@/shared/ui/Stack';

import './ProxyRoutesList.css';

export const ProxyRoutesList = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<ProxyRoute>();

  const { data, isLoading, isFetching } = useGetProxyRoutesListQuery();

  const onEditRoute = (route: ProxyRoute) => {
    setSelectedRoute(route);
    setIsEditModalOpen(true);
  };

  const onCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedRoute(undefined);
  };

  if (isLoading || isFetching) {
    return (
      <HStack className="h-[300px] justify-center">
        <Loader />
      </HStack>
    );
  }

  return (
    <VStack>
      <Button className="px-5" onClick={() => setIsEditModalOpen(true)}>
        Добавить маршруты <Plus size={16} />
      </Button>

      <div className="mt-5 grid w-full grid-cols-2 gap-3">
        {data?.rows.length ? (
          data?.rows.map((route) => (
            <ProxyRouteCard
              key={route.id}
              proxyRoute={route}
              onEdit={() => onEditRoute(route)}
            />
          ))
        ) : (
          <EmptyData text="Маршруты не найдены." />
        )}
      </div>

      <EditableProxyRouteModal
        isOpen={isEditModalOpen}
        existData={selectedRoute}
        onOpenChange={onCloseModal}
      />
    </VStack>
  );
};
